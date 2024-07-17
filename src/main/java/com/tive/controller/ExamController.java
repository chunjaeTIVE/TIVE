package com.tive.controller;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
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

    @GetMapping("/exam1")
    public String exam1(Model model){
        List<QuestionDTO> exam1 = examService.findExam();
        List<String> orders = new ArrayList<>();
        for(QuestionDTO dto : exam1){
            orders.add(dto.getOrderName());
        }
        model.addAttribute("exam",exam1);
        model.addAttribute("title",exam1.get(0).getExamName());
        model.addAttribute("orders",orders);
        //model.addAttribute("view","exam/testview");
        return "exam/testview";
    }
}