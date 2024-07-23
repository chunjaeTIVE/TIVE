package com.tive.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.domain.ExamItem;
import com.tive.domain.QuestionItem;
import com.tive.domain.UserTest;
import com.tive.domain.Users;
import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.repository.examitem.ExamItemRepository;
import com.tive.repository.questionitem.QuestionItemRepository;
import com.tive.repository.users.UsersRepository;
import com.tive.repository.usertestans.UserTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.*;
import java.util.concurrent.atomic.LongAccumulator;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService{
    private final ExamItemRepository examItemRepository;
    private final QuestionItemRepository questionItemRepository;
    private final UsersRepository usersRepository;
    private final UserTestRepository userTestRepository;
    @Override
    public List<ExamDTO> findExamList() {
        List<ExamDTO> list = examItemRepository.findExamList();
        return list;
    }

    @Override
    public List<QuestionDTO> findExam(Long eid) {
        List<QuestionDTO> exam = examItemRepository.findExam(eid);
        return exam;
    }

    @Override
    public ExamDTO findExamInfo(String userSL, String subject, int examKind) {
        ExamDTO examInfo = examItemRepository.findExamInfo(userSL, subject, examKind);
        return examInfo;
    }

    @Override
    public Long submitExam(String email, HashMap<String, Object> hm) {
        // 1. user test insert
//        Users user = usersRepository.findByEmail(email);
//        Optional<ExamItem> examItem = examItemRepository.findById(Long.parseLong((String)hm.get("eid")));
//        ExamItem examInfo = examItem.orElseThrow(()->{throw new RuntimeException();});
//        UserTest userTest = UserTest.builder()
//                .utToExam(examInfo)
//                .utToUsers(user)
//                .build();
//        System.out.println(user.getEmail()+","+examInfo.getExamName());
        //userTestRepository.save(userTest);
        // 2. 채점
        List<Object> list = (List<Object>) hm.get("body");
        String c = "수소, 5mL";
        List<Object[]> real = questionItemRepository.findAnswer(Long.parseLong((String) hm.get("eid")));
        int k=0,j=0;
        String qanswer ="";
        int[] corrects = new int[real.size()];
        while(j<real.size()){
            if(k<list.size()){
                HashMap<String,Object> ans = (HashMap<String, Object>) list.get(k);
                String uqid = (String) ans.get("qid");
                System.out.println(uqid+","+real.get(j)[0]);
                Long idx = Long.parseLong(uqid) - (Long)real.get(j)[0];
                if(j>=0 && idx>0){
                    for(int i=0; i<idx; i++){
                        corrects[j+i] = 0;
                    }
                    j += idx;
                }
                qanswer = (String) real.get(j)[1];

//                HashMap<String, String> stringObjectHashMap = new HashMap<>();
//                try{
//                    stringObjectHashMap = new ObjectMapper().readValue(qanswer, new TypeReference<HashMap<String, String>>() {
//                    });
//                }catch (IOException e){
//                    System.out.println(e);
//                }

                System.out.println("idx:"+idx+", realqid:"+real.get(j)[0]);
                // 채점을 해서 맞으면 correct[j]=1 아니면 0
                Object answer = ans.get("answer");
                Object textarea = ans.get("textarea");
                StringBuilder userAnswer = new StringBuilder();
                if(answer!=null){
                    if(answer instanceof String){
                        String stringAns = (String) answer;
                        System.out.println(ans.get("qid")+" : "+stringAns+", "+qanswer);
                        System.out.println(qanswer.contains(stringAns));
                        userAnswer.append(stringAns);
                    } else if(answer instanceof List){
                        List<String> answerarr = (List<String>) answer;
                        System.out.println(ans.get("qid")+", "+answerarr.get(0)+", "+qanswer);
                        HashMap<String, String[]> stringObjectHashMap = new HashMap<>();
                        try{
                            stringObjectHashMap = new ObjectMapper().readValue(qanswer, new TypeReference<HashMap<String, String[]>>() {
                            });
                        }catch (IOException e){
                            System.out.println(e);
                        }
                        for(int i=0; i<stringObjectHashMap.get("answer").length; i++){
                            System.out.println(stringObjectHashMap.get("answer")[i].contains(answerarr.get(i)));
                        }
                        for(String s : answerarr){userAnswer.append(s+",");}
                    }
                    if(textarea !=null && textarea instanceof String){
                        String singletxt = (String) textarea;
                        System.out.println(ans.get("qid")+", "+singletxt+", "+qanswer);
                        System.out.println(qanswer.contains(singletxt));
                        userAnswer.append(singletxt);
                    } else if (textarea!=null && textarea instanceof List){
                        List<String> textareaarr = (List<String>) textarea;
                        System.out.println(ans.get("qid")+", "+textareaarr.get(0)+", "+qanswer);
                        HashMap<String, String[]> stringObjectHashMap = new HashMap<>();
                        try{
                            stringObjectHashMap = new ObjectMapper().readValue(qanswer, new TypeReference<HashMap<String, String[]>>() {
                            });
                        }catch (IOException e){
                            System.out.println(e);
                        }
                        for(int i=0; i<stringObjectHashMap.get("textarea").length; i++){
                            System.out.println(stringObjectHashMap.get("textarea")[i].contains(textareaarr.get(i)));
                        }
                        for(String s : textareaarr){userAnswer.append(s+",");}
                    }
                } else {
                    if(textarea !=null && textarea instanceof String){
                        String singletxt = (String) textarea;
                        System.out.println(ans.get("qid")+", "+singletxt+", "+qanswer);
                        System.out.println(qanswer.contains(singletxt));
                        userAnswer.append(singletxt);
                    } else if (textarea!=null && textarea instanceof List){
                        List<String> answerarr = (List<String>) textarea;
                        System.out.println(ans.get("qid")+", "+answerarr.get(0)+", "+qanswer);
                        HashMap<String, String[]> stringObjectHashMap = new HashMap<>();
                        try{
                            stringObjectHashMap = new ObjectMapper().readValue(qanswer, new TypeReference<HashMap<String, String[]>>() {
                            });
                        }catch (IOException e){
                            System.out.println(e);
                        }
                        for(int i=0; i<stringObjectHashMap.get("answer").length; i++){
                            System.out.println(stringObjectHashMap.get("answer")[i].contains(answerarr.get(i)));
                        }
                        for(String s : answerarr){userAnswer.append(s+",");}
                    }
                }


                if(userAnswer.toString().equals("")){
                    corrects[j] = 0;
                } else {
                    corrects[j] = 1;
                }
            } else {
                corrects[j] = 0;
            }
            j++; k++;
        }
        for(int in : corrects){
            System.out.print(in+",");
        }


        // 3. user answer bulk insert
        return null;
    }

}
