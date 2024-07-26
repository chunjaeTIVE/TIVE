package com.tive.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.dto.UsersDTO;
import com.tive.exception.CustomException;
import com.tive.service.ExamService;
import com.tive.service.UserService;
import lombok.RequiredArgsConstructor;
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
public class ExamController {
    private final ExamService examService;
    private final UserService userService;

    @GetMapping("/test")
    public @ResponseBody List<ExamDTO> index(){
        List<ExamDTO> examDTOList = examService.findExamList();
        return examDTOList;
    }
@GetMapping("/exam1/{eid}")
public String exam1(@PathVariable Long eid, Model model) {
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
    public ResponseEntity<Long> submitExam(@RequestBody HashMap<String,Object> hm, Principal principal){
        String email = "";
        if(principal!=null)
            email = principal.getName();
        System.out.println(hm.get("body"));
        Long result = examService.submitExam(email,hm);
        return new ResponseEntity<>(1L,HttpStatus.OK);
    }
}