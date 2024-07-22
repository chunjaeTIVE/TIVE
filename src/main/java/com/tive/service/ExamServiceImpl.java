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
        List<HashMap<String,Object>> list = new ArrayList<>(); //= (List<HashMap<String,Object>>) hm.get("body");
        List<Object[]> examAnswers = questionItemRepository.findAnswer(Long.parseLong((String) hm.get("eid")));
        for(Object[] o:examAnswers){
            System.out.println("start:"+o[0]);
            HashMap<String,Object> qAnswer = new HashMap<>();
            try{
                qAnswer = new ObjectMapper().readValue((String)o[1]
                        , new TypeReference<HashMap<String, Object>>() {});
            }catch (IOException e){
                System.out.println(e);
            }

            System.out.println("qAnswer: "+qAnswer.get("answer"));
            for(int i=0; i<list.size(); i++){

                //Set<String> keys = list.get(i).keySet();
                Integer correct = 0;
                String qansString;
                String[] qansArr;
                String qtxtString;
                String[] qtxtArr;
                Object ans = list.get(i).get("answer");
                Object txt = list.get(i).get("textarea");
                if((Long)o[0]==Long.parseLong((String)list.get(i).get("qid"))){
                    if(ans!=null && ans instanceof String){
                        qansString = (String) ans;
                        System.out.println(qansString);
                    } else if(ans!=null) {
                        System.out.println("else if:"+list);
                    } else {
                        System.out.println("else:"+ans);
                    }
                    if(txt!=null && txt instanceof String){
                        qtxtString = (String) txt;
                        System.out.println(qtxtString);
                    } else if(txt!=null) {
                        qtxtArr = (String[]) txt;
                        System.out.println(qtxtArr[0]);
                    }
                }
            }
        }

        //questionItemRepository.findById()
        // 3. user answer bulk insert
        return null;
    }

}
