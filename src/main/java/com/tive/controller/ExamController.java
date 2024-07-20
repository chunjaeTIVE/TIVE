package com.tive.controller;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;
    @GetMapping("/test")
    public @ResponseBody List<ExamDTO> index(){
        List<ExamDTO> examDTOList = examService.findExamList();
        return examDTOList;
    }

    @GetMapping("/exam1/{eid}")
    public String exam1(@PathVariable Long eid, Model model){
        List<QuestionDTO> exam1 = examService.findExam(eid);
        List<String> orders = new ArrayList<>();
        for(QuestionDTO dto : exam1){
            orders.add(dto.getOrderName());
        }
        model.addAttribute("exam",exam1);
        model.addAttribute("eid",exam1.get(0).getEid());
        model.addAttribute("title",exam1.get(0).getExamName());
        model.addAttribute("orders",orders);
        //model.addAttribute("view","exam/testview");
        return "exam/testview";
    }

    @PostMapping("/submit_exam")
    public ResponseEntity<String> submitExam(@RequestBody HashMap<String,Object> hm){
        System.out.println(hm.get("body"));
        List<HashMap<String,Object>> list = (List<HashMap<String,Object>>) hm.get("body");
        System.out.println(list.get(0).get("answer"));
        return new ResponseEntity<>("ok",HttpStatus.OK);
    }
}