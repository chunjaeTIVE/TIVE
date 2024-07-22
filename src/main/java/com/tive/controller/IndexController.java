package com.tive.controller;

import com.tive.dto.ExamDTO;
import com.tive.dto.NoticeDTO;
import com.tive.service.ExamService;
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
    private final UserService userService;

    private final ExamService examService;

    @GetMapping("/index")
    public String main2(Model model, Principal principal){


        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";
        Long uid=0L;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            uid=userService.getUserInfo(useremail).getUid();
            username = userService.getUserInfo(useremail).getName();

            model.addAttribute("uid", uid);
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }
        List<NoticeDTO> noticeList = noticeService.getNoticeList();

        model.addAttribute("nList", noticeList);
        model.addAttribute("view","main/main");

        return "index";
    }

    @GetMapping("/playTest/{eid}")
    public String playTest(
            @PathVariable long eid
            , Model model
            , Principal principal
    ){

        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";
        Long uid=0L;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            uid=userService.getUserInfo(useremail).getUid();
            username = userService.getUserInfo(useremail).getName();

            model.addAttribute("uid", uid);
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("eid", eid);
        model.addAttribute("view", "info/play_test");

        return "index";
    }


    @GetMapping("/warnInfo/{eid}")
    public String warnInfo(
            @PathVariable int eid
            , Model model
            , Principal principal
    ){
        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";
        Long uid=0L;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            uid=userService.getUserInfo(useremail).getUid();
            username = userService.getUserInfo(useremail).getName();

            model.addAttribute("uid", uid);
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }
        model.addAttribute("examKind", eid);
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
        Long uid=0L;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            uid=userService.getUserInfo(useremail).getUid();
            username = userService.getUserInfo(useremail).getName();

            model.addAttribute("uid", uid);
            model.addAttribute("username",username);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("schoolLevel", schoolLevel);
        model.addAttribute("view", "info/cbt_test");
        return "index";
    }

    /** 응시페이지 */
    @GetMapping("/testgogo/{examKind}")
    public String testGogo(
            @PathVariable int examKind
            , Model model
            , Principal principal
    ){

        //현재 세션으로 유저 이름, 학교급 가져오기
        String useremail = "";
        String username = "";
        String userSL = "";
        Long uid=0L;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName(); // 유저 이름
            uid=userService.getUserInfo(useremail).getUid();
            userSL = userService.getUserInfo(useremail).getSchoolLevel(); // 학교급

            model.addAttribute("username",username);
            model.addAttribute("uid", uid);
            model.addAttribute("userSL", userSL);

            //각 과목 eid 가져오기
            ExamDTO korean, math, english, society, science;

            korean = examService.findExamInfo(userSL,"국어",examKind);
            math = examService.findExamInfo(userSL,"수학",examKind);
            english = examService.findExamInfo(userSL,"영어",examKind);

            model.addAttribute("korean", korean);
            model.addAttribute("math",math);
            model.addAttribute("english",english);

            if (!userSL.equals("HL")){ //고등학생이 아니면 사회, 과학도 받음
                society = examService.findExamInfo(userSL,"사회",examKind);
                science = examService.findExamInfo(userSL,"과학",examKind);
                model.addAttribute("society",society);
                model.addAttribute("science",science);
            }

        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        model.addAttribute("examKind", examKind);
        model.addAttribute("view", "info/test_gogo");

        return "index";
    }
}
