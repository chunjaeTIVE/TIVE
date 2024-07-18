package com.tive.controller;

import com.tive.dto.UsersDTO;
import com.tive.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error, Model model){
        if (error!=null){ //로그인 정보 잘못 입력했을 때
            model.addAttribute("errorMessage", "로그인 정보가 잘못되었습니다.");
        }
        model.addAttribute("view","user/login");
        return "index";
    }

    @GetMapping("/join")
    public String join(Model model){

        model.addAttribute("dto", new UsersDTO());
        model.addAttribute("view","user/join");

        return "index";
    }

    @PostMapping("/join")
    public String joinResult(@Valid @ModelAttribute("dto") UsersDTO dto, BindingResult bindingResult, Model model ){

        if (bindingResult.hasErrors()){

            model.addAttribute("view","user/join");
            return "index";
        }else{
            Long user = userService.join(dto);
            //model.addAttribute("error", true);  // 이메일 중복 에러 설정
            model.addAttribute("dto", dto);
            return "redirect:/login";
        }

/*        if (bindingResult.hasErrors()) {
            model.addAttribute("dto", dto);
            model.addAttribute("view","user/join");

            return "index";
        } else {
            try {
                log.info("dto.....{}", dto.getRole());
                Long user = userService.join(dto);
                return "redirect:/login";
            } catch (RuntimeException e) {
                log.error("Error during user registration1212121212: {}", e.getMessage());
                model.addAttribute("error", true);  // 이메일 중복 에러 설정
                model.addAttribute("dto", dto);
                model.addAttribute("view","user/join");

                return "index";
            }
        }*/
    }

    //회원가입 이메일 중복체크
    @PostMapping("/emailCheck")
    public @ResponseBody Long emailCheck(@RequestBody Map<String,Object> hm) {
        String email = (String) hm.get("email");
        System.out.println("Email to check: " + email); // 디버깅용 로그 추가

        Long cnt = userService.emailCheck(email);

        return cnt;
    }

}
