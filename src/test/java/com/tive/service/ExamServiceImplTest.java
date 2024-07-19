package com.tive.service;

import com.tive.dto.QuestionDTO;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class ExamServiceImplTest {
//    @Autowired
//    private ExamService examService;
//
//    @Test
//    void findExam() {
//        List<QuestionDTO> exam = examService.findExam();
//        Assertions.assertThat(exam.size()).isGreaterThan(20);
//        Assertions.assertThat(exam.get(0).getExamName()).isEqualTo("중3영어(2회)");
//        for(QuestionDTO d:exam){
//            System.out.println(d.getQid()+d.getExamName());
//        }
//    }
//}