package com.tive.controller;

import com.tive.dto.ExamDTO;
import com.tive.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}