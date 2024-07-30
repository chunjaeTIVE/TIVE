package com.tive.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.dto.UsersDTO;
import com.tive.exception.CustomException;
import com.tive.service.ExamService;
import com.tive.service.ReportService;
import com.tive.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ExamController {
    private final ExamService examService;


@GetMapping("/exam1/{eid}")
public String exam1(@PathVariable Long eid
//        , @PathVariable long mediaCheck
//        , @PathVariable long noticeAgree
        , Model model) {
//    if(mediaCheck != 1 || noticeAgree !=1){
//        throw new CustomException(" from ExamController exam1 ");
//    }
    List<QuestionDTO> exam1 = examService.findExam(eid);
    if (exam1 == null || exam1.isEmpty()) {
        throw new CustomException("Exam not found for ID: " + eid);
    }

    List<String> orders = new ArrayList<>();
    for (QuestionDTO dto : exam1) {
        orders.add(dto.getOrderName());
    }

    model.addAttribute("exam", exam1);
    model.addAttribute("eid", exam1.get(0).getEid());
    model.addAttribute("title", exam1.get(0).getExamName());
    model.addAttribute("orders", orders);
    //model.addAttribute("view","exam/testview");
    return "exam/testview";
}
    @PostMapping("/submit_exam")
    public ResponseEntity<Integer> submitExam(@RequestBody HashMap<String,Object> hm, Principal principal){
        String email = "";
        if(principal!=null)
            email = principal.getName();
        log.info(" ExamController submit_exam hm body(userAnswer) : ....{}",hm.get("body"));
        Long utid = examService.submitExam(email,hm);
        log.info(" ExamController submit_exam utid : ... {}",utid);
        int result = examService.addScore(utid);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}