package com.tive.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.dto.QuestionDTO;
import com.tive.repository.questionitem.QuestionItemRepository;
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
    void findAnswer(){
//        List<Object[]> answer = questionItemRepository.findAnswer(14L);
//        Assertions.assertThat(answer).isNotNull();
//        for(Object[] o:answer){
//            System.out.println(o[1]);
//            //HashMap<String,Object> ans = (HashMap<String, Object>) o[1];
//           // System.out.println(ans.get("answer"));
//        }
        List<Object[]> examAnswers = questionItemRepository.findAnswer(14L);
        for(Object[] o:examAnswers){
            System.out.println((String)o[1]);
        }
        for(Object[] o:examAnswers) {
            System.out.println("start:" + o[0]);
            try {
                ObjectMapper mapper = new ObjectMapper();
                HashMap<String, Object> qAnswer = mapper.readValue((String) o[1]
                        , new TypeReference<HashMap<String, Object>>() {
                        });
                System.out.println("qTextarea:" + qAnswer.get("answer")+", casting String:"+(qAnswer.get("answer") instanceof String));
            } catch (IOException e) {
                System.out.println(e);
            }

        }
    }

    @Test
    void test(){
        Object json = "{'a':'1'}";
        Object json2 = "{'b':['1','2']}";
        String[] arr = new String[]{"a","b"};
        String val = "1";
        System.out.println(json instanceof String);
    }
}