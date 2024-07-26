package com.tive.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.domain.UserAnswer;
import com.tive.domain.UserTest;
import com.tive.dto.QuestionDTO;
import com.tive.repository.questionitem.QuestionItemRepository;
import com.tive.repository.usertestans.UserTestRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExamServiceImplTest {
    @Autowired
    private ExamService examService;

    @Autowired
    private QuestionItemRepository questionItemRepository;
    @Autowired
    private UserTestRepository userTestRepository;

    @Test
    void findExam() {
        Assertions.assertThat(questionItemRepository).isNotNull();
//        List<QuestionDTO> exam = examService.findExam(14L);
//        Assertions.assertThat(exam.size()).isGreaterThan(20);
//        Assertions.assertThat(exam.get(0).getExamName()).isEqualTo("중3영어(2회)");
//        for(QuestionDTO d:exam){
//            System.out.println(d.getQid()+d.getExamName());
//        }
    }


    @Test
    void test(){
        Object json = "{'a':'1'}";
        Object json2 = "{'b':['1','2']}";
        String[] arr = new String[]{"a","b"};
        String val = "1";
        System.out.println(json instanceof String);
    }

    @Test
    @Transactional
    void test2(){
        UserTest byUser = userTestRepository.findByUser(44L, 9L);
        for(UserAnswer a: byUser.getUaList()){
            System.out.println(a.getUserAns());
            a.setUserAns("answer");
            System.out.println(a.getUserAns());
        }
    }
}