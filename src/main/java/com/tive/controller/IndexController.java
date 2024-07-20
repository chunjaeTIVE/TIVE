package com.tive.controller;

import com.tive.dto.NoticeDTO;
import com.tive.service.NoticeService;
import com.tive.service.UserDetailService;
import com.tive.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;
import java.util.List;


@Controller
@RequiredArgsConstructor
@Slf4j
public class IndexController {

    private final NoticeService noticeService;
    private final UserDetailService userDetailService;
    private final UserService userService;

    @GetMapping("/index")
    public String main2(Model model, Principal principal){


        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }
        List<NoticeDTO> noticeList = noticeService.getNoticeList();

        model.addAttribute("nList", noticeList);
        model.addAttribute("view","main/main");

        return "index";
    }

    @GetMapping("/playTest/{examKind}")
    public String playTest(
            @PathVariable String examKind
            , Model model
            , Principal principal
    ){

        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("examKind", examKind);
        model.addAttribute("view", "info/play_test");

        return "index";
    }


    @GetMapping("/warnInfo/{examKind}")
    public String warnInfo(
            @PathVariable String examKind
            , Model model
            , Principal principal
    ){
        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }
        model.addAttribute("examKind", examKind);
        model.addAttribute("view", "info/warn_info");

        return "index";
    }
  
/** cbt안내 */
    @GetMapping("/cbtTest/{schoolLevel}")
    public String cbtTest( @PathVariable String schoolLevel
            , Model model
            , Principal principal){

        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("view", "info/cbt_test");
        return "index";
    }

    /** 응시페이지 */
    @GetMapping("/testgogo/{examKind}")
    public String testGogo(
            @PathVariable String examKind
            , Model model
            , Principal principal
    ){

        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("examKind", examKind);
        model.addAttribute("view", "info/test_gogo");

        return "index";
    }
}
