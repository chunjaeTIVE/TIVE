package com.tive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController { /*에러화면 확인용 controller - 나중에 지울거임*/
    @GetMapping("/error500")
    public String error(Model model){
        model.addAttribute("view", "error/error500");
        return "index";
    }
}
