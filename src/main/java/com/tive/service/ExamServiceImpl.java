package com.tive.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.domain.*;
import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.exception.CustomException;
import com.tive.repository.examitem.ExamItemRepository;
import com.tive.repository.questionitem.QuestionItemRepository;
import com.tive.repository.report.ReportRepository;
import com.tive.repository.users.UsersRepository;
import com.tive.repository.usertestans.UserAnswerRepository;
import com.tive.repository.usertestans.UserTestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExamServiceImpl implements ExamService{
    private final ExamItemRepository examItemRepository;
    private final QuestionItemRepository questionItemRepository;
    private final UsersRepository usersRepository;
    private final UserTestRepository userTestRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final ReportRepository reportRepository;

    @Override
    public ExamDTO findExamByEid(Long eid) {
        ExamDTO exam = examItemRepository.findExamByEid(eid);
        if (exam == null) {
            throw new CustomException(" from ExamService findExamByEid ");
        }
        return exam;
    }

    @Override
    public List<QuestionDTO> findExam(Long eid) {
        List<QuestionDTO> exam = examItemRepository.findExam(eid);
        return exam;
    }

    @Override
    public ExamDTO findExamInfo(String userSL, String subject, int examKind) {
        ExamDTO examInfo = examItemRepository.findExamInfo(userSL, subject, examKind);
        if (examInfo == null) {
            throw new CustomException(" from ExamService findExamInfo ");
        }
        return examInfo;
    }

    @Override
    @Transactional
    public Long submitExam(String email, HashMap<String, Object> hm) {
        // 1. 최초 응시 / 재응시 여부 파악
        Long eid = Long.parseLong((String)hm.get("eid"));
        log.info("eid...{}",eid);
        Users user = usersRepository.findByEmail(email);
        UserTest findUserTest = userTestRepository.findByUser(user.getUid(), eid);
        UserTest saveUserTest;
        boolean reTry = false;
        List<UserAnswer> findUserAnsList = new ArrayList<>();
        if(findUserTest==null){
            // 2. user test insert
            Optional<ExamItem> examItem = examItemRepository.findById(eid);
            ExamItem examInfo = examItem.orElseThrow(()->{throw new RuntimeException();});
            UserTest userTest = UserTest.builder()
                    .utToExam(examInfo)
                    .utToUsers(user)
                    .countCorrect(0)
                    .examDate(LocalDateTime.now())
                    .localCode(user.getLocalCode())
                    .build();
            log.info("user auth email, examname...{},{}",user.getEmail(),examInfo.getExamName());
            //System.out.println(user.getEmail()+","+examInfo.getExamName());
            saveUserTest = userTestRepository.save(userTest);
        } else {
            saveUserTest = findUserTest;
            saveUserTest.setLocalCode(user.getLocalCode());
            saveUserTest.setExamDate(LocalDateTime.now());
            reTry = true;
            //findUserAnsList = findUserTest.getUaList();
            findUserAnsList = userAnswerRepository.findByUserExam(user.getUid(),eid);
            log.info("findUserAnsList size...{}",findUserAnsList.size());
            System.out.println("findUserAnsList size : "+findUserAnsList.size());
        }
        // 3. 채점
        List<Object> list = (List<Object>) hm.get("body");
        List<QuestionItem> real = questionItemRepository.findAnswer(Long.parseLong((String) hm.get("eid")));
        int k=0,j=0;
        String qanswer;
        int[] corrects = new int[real.size()];
        List<UserAnswer> userAnswers = new ArrayList<>();
        while(j<real.size()){
            if(k<list.size()){
                HashMap<String,Object> ans = (HashMap<String, Object>) list.get(k);
                String uqid = (String) ans.get("qid");
                log.info("uqid, realqid... {},{}",uqid,real.get(j).getQid());
                Long order = Long.parseLong((String) ans.get("order"))-1;
                Long idx = order - j;
                if(j>=0 && idx>0){
                    for(int i=0; i<idx; i++){
                        corrects[j+i] = 0;
                        if(reTry){
                            findUserAnsList.get(j+i).setUserAns("");
                            findUserAnsList.get(j+i).setCorrect(0);
                        } else {
                            System.out.println("건너뜀 j "+j+i+", order"+order);
                            UserAnswer uaEntity = UserAnswer.builder()
                                    .userAns("")
                                    .correct(0)
                                    .uaToUsers(user)
                                    .uaToQuestion(real.get(j+i))
                                    .uaToUt(saveUserTest)
                                    .build();
                            userAnswers.add(uaEntity);
                        }
                    }
                    j += idx;
                }
                qanswer = real.get(j).getAnswer();
                log.info("idx, j, realqid...{},{},{}",idx,j,real.get(j).getQid());

                // 채점을 해서 맞으면 correct[j]=1 아니면 0
                Object answer = ans.get("answer");
                Object textarea = ans.get("textarea");
                // real answer casting
                HashMap<String, Object> stringObjectHashMap = new HashMap<>();
                try{
                    stringObjectHashMap = new ObjectMapper().readValue(qanswer, new TypeReference<HashMap<String, Object>>() {
                    });
                }catch (IOException e){
                    log.error("submitExam realAnswer parse error....{}",e);
                    throw new RuntimeException(" from ExamService submitExam ");
                }
                StringBuilder userAnswer = new StringBuilder();
                int correct = 0;
                if(answer!=null && textarea!=null) {
                    if (answer instanceof String) {
                        // user answer casting 및 채점
                        String stringAns = (String) answer;
                        String[] answerResult = Marking.stringAnswer(uqid, stringAns, qanswer);
                        // textarea 채점
                        String[] textResult;
                        if (textarea instanceof String) { // answer string, textarea string
                            // textarea 채점
                            String stringTxt = (String) textarea;
                            textResult = Marking.stringAnswer(uqid, stringTxt, qanswer);
                        } else { // answer string , textarea string[]
                            // textarea[] 채점
                            List<String> textareaarr = (List<String>) textarea;
                            textResult = Marking.listAnswer(uqid,stringObjectHashMap,"textarea",textareaarr,qanswer);
                        }
                        //answerResult,textResult 를 가지고 최종 채점
                        userAnswer.append(answerResult[0]);
                        userAnswer.append(textResult[0]);
                        if(Integer.parseInt(answerResult[1])+Integer.parseInt(textResult[1])==2)
                            correct = 1;
                    } else if (answer instanceof List) {
                        // user answer[] casting 및 채점
                        List<String> answerarr = (List<String>) answer;
                        String[] answerResult = Marking.listAnswer(uqid,stringObjectHashMap,"answer",answerarr,qanswer);
                        // textarea 채점
                        String[] textResult;
                        if (textarea instanceof String) { // answer string[], textarea string
                            // textarea 채점
                            String stringTxt = (String) textarea;
                            textResult = Marking.stringAnswer(uqid, stringTxt, qanswer);
                        } else { // answer string[], textarea string[]
                            // textarea[] 채점
                            List<String> textareaarr = (List<String>) textarea;
                            textResult = Marking.listAnswer(uqid,stringObjectHashMap,"textarea",textareaarr,qanswer);
                        }
                        userAnswer.append(answerResult[0]);
                        userAnswer.append(textResult[0]);
                        if(Integer.parseInt(answerResult[1])+Integer.parseInt(textResult[1])==2)
                            correct = 1;
                    }
                } else if (answer!=null && textarea == null){
                    String[] answerResult = new String[2];
                    if(answer instanceof String){
                        // user answer casting 및 채점
                        String stringAns = (String) answer;
                        answerResult = Marking.stringAnswer(uqid, stringAns, qanswer);
                    } else if (answer instanceof List){
                        // user answer[] casting 및 채점
                        List<Object> answerList = (List<Object>) answer;
                        if(answerList.get(0) instanceof String) {
                            List<String> stringAnsList = (List<String>) answer;
                            answerResult = Marking.listAnswer(uqid, stringObjectHashMap, "answer", stringAnsList, qanswer);
                        }else if (answerList.get(0) instanceof List) {
                            List<List<String>> dropAnswerList = (List<List<String>>) answer;
                            answerResult = Marking.dragDropAnswer(uqid,stringObjectHashMap,dropAnswerList,qanswer);
                        }
                    }
                    userAnswer.append(answerResult[0]);
                    correct = Integer.parseInt(answerResult[1]);
                } else if (answer==null && textarea!=null){
                    String[] textResult;
                    if (textarea instanceof String) { // answer string[], textarea string
                        // textarea 채점
                        String stringTxt = (String) textarea;
                        textResult = Marking.stringAnswer(uqid, stringTxt, qanswer);
                    } else { // answer string[], textarea string[]
                        // textarea[] 채점
                        List<String> textareaarr = (List<String>) textarea;
                        textResult = Marking.listAnswer(uqid,stringObjectHashMap,"answer",textareaarr,qanswer);
                    }
                    userAnswer.append(textResult[0]);
                    correct = Integer.parseInt(textResult[1]);
                } else {
                    // 둘다 널인 경우는 예외처리
                    throw new RuntimeException("from Examservice all answers is null");
                }
                corrects[j] = correct;
                // 여기서 user answer insert
                if(reTry){
                    log.info("이전 정답, 지금 정답 ...{},{}",findUserAnsList.get(j).getUserAns(),userAnswer.toString());
                    findUserAnsList.get(j).setUserAns(userAnswer.toString());
                    findUserAnsList.get(j).setCorrect(correct);
                    log.info("바뀐 정답... {}",findUserAnsList.get(j).getUserAns());
                } else {
                    UserAnswer uaEntity = UserAnswer.builder()
                            .userAns(userAnswer.toString())
                            .correct(correct)
                            .uaToUsers(user)
                            .uaToQuestion(real.get(j))
                            .uaToUt(saveUserTest)
                            .build();
                    userAnswers.add(uaEntity);
                }
            } else {
                corrects[j] = 0;
                // userAnswer 는 ""
                // 여기서 user answer insert
                if(reTry){
                    log.info("이전 정답...{}",findUserAnsList.get(j).getUserAns());
                    findUserAnsList.get(j).setUserAns("");
                    findUserAnsList.get(j).setCorrect(0);
                    log.info("바뀐 정답...{}",findUserAnsList.get(j).getUserAns());
                } else {
                    UserAnswer uaEntity = UserAnswer.builder()
                            .userAns("")
                            .correct(0)
                            .uaToUsers(user)
                            .uaToQuestion(real.get(j))
                            .uaToUt(saveUserTest)
                            .build();
                    userAnswers.add(uaEntity);
                }

            }
            j++; k++;
        }
        int countCorrect = 0;
        for(int in : corrects){
            if(in==1)
                countCorrect += 1;
            System.out.print(in+",");
        }
        if(!reTry)
            userAnswerRepository.saveAll(userAnswers);
        saveUserTest.setCountCorrect(countCorrect);
        return saveUserTest.getUtId();
    }

    @Override
    @Transactional
    public int addScore(Long utid) {
        Integer score = reportRepository.getScore(utid);
        Optional<UserTest> findUT = userTestRepository.findById(utid);
        UserTest userTest = findUT.orElseThrow(() -> {
            throw new RuntimeException();
        });
        userTest.setScore(score);
        return 1;
    }
}
