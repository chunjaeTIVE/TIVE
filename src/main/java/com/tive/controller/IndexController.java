package com.tive.controller;

import com.tive.dto.NoticeDTO;
import com.tive.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class IndexController {

    private final NoticeService noticeService;

    @GetMapping("/index")
    public String main2(Model model){

        List<NoticeDTO> noticeList = noticeService.getNoticeList();

        model.addAttribute("nList", noticeList);
        model.addAttribute("view","main/main");

        return "index";
    }


}
