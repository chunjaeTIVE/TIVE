package com.tive.controller;

import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import com.tive.service.ReportService;
import com.tive.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReportController {

    private final ReportService reportService;

    private final UserService userService;

    /**기본 리포트로 이동*/
    @GetMapping("/report_basic/{uid}")
    public String reportBasic(@PathVariable("uid") Long uid
            , @RequestParam(name = "round", required = false, defaultValue = "0") int round
            , @RequestParam(name = "subject", required = false) String subject
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

        // 응시 이력 가져오기
        List<ReportExamDTO> list =  reportService.getExamHistory(uid);


        // 응시 이력 하나도 없으면 알림창으로 이동
        int check = 0;
        if(list.size() == 0 || list.get(0).getUtId() == null || "".equals(list.get(0).getUtId())){

            model.addAttribute("check", check);

            return "report/report_alert";
        }


        if(subject != null && round != 0 && !"0".equals(round)){
            // 전달 받은 값이 있으면 -> 값에 맞는 응시 이력이 있는지 체크


            for(int i =0; i<list.size(); i++ ){
                int check_round = list.get(i).getRound();
                String check_subject = list.get(i).getSubject();


                if(check_round == round && check_subject.equals(subject)){
                    check = 1;
                    break;
                }
            }
            if(check == 1){
                // 시험 기본 정보 가져오기
                ReportExamDTO report = reportService.getTest(uid, round, subject);
                model.addAttribute("report", report);
                model.addAttribute("round", round);
                model.addAttribute("subject", subject);
            } else {
                // 값에 맞는 응시 이력 없음 -> 알림창 이동
                check = 2;

                model.addAttribute("uid", uid);
                model.addAttribute("check", check);
                return "report/report_alert";
            }

        } else {
            // 전달 받은 값이 없으면 가장 최근에 본 시험 정보 가져옴
            round = list.get(0).getRound();
            subject = list.get(0).getSubject();

            ReportExamDTO report = reportService.getTest(uid, round, subject);
            model.addAttribute("report", report);
            model.addAttribute("round", round);
            model.addAttribute("subject", subject);

        }

        model.addAttribute("view", "report/report_basic");
        return "index";
    }



    /**상세 리포트로 이동*/
    @GetMapping("/report_detail/{uid}")
    public String reportDetail(@PathVariable("uid") Long uid
            , @RequestParam(name = "round", required = false, defaultValue = "0") int round
            , @RequestParam(name = "subject", required = false) String subject
            , Model model
            , Principal principal
    ) {

        //현재 세션으로 유저 이름 가져오기
        String useremail = "";
        String username = "";
        //현재 로그인한 사용자 마케팅 동의 여부 가져오기
        int agree = 0;

        if (principal != null && principal.getName() != null){ //로그인 한 경우에만 받아옴
            useremail = principal.getName();
            username = userService.getUserInfo(useremail).getName();

            agree = userService.getUserInfo(useremail).getAgree();

            model.addAttribute("username",username);
            model.addAttribute("agree", agree);
        } else { //아니면 로그값 출력
            log.info("Principal is null or principal.getName() is null");
        }

        // 응시 이력 가져오기
        List<ReportExamDTO> list =  reportService.getExamHistory(uid);


        // 응시 이력 하나도 없으면 알림창으로 이동
        int check = 0;
        if(list.size() == 0 || list.get(0).getUtId() == null || "".equals(list.get(0).getUtId())){

            model.addAttribute("check", check);

            return "report/report_alert";
        }


        if(subject != null && round != 0 && !"0".equals(round)){
            // 전달 받은 값이 있으면 -> 값에 맞는 응시 이력이 있는지 체크


            for(int i =0; i<list.size(); i++ ){
                int check_round = list.get(i).getRound();
                String check_subject = list.get(i).getSubject();


                if(check_round == round && check_subject.equals(subject)){
                    check = 1;
                    break;
                }
            }
            if(check == 1){
                // 시험 기본 정보 가져오기
                ReportExamDTO report = reportService.getTest(uid, round, subject);
                model.addAttribute("report", report);
                model.addAttribute("round", round);
                model.addAttribute("subject", subject);
            } else {
                // 값에 맞는 응시 이력 없음 -> 알림창 이동
                check = 3;

                model.addAttribute("uid", uid);
                model.addAttribute("check", check);
                return "report/report_alert";
            }

        } else {
            // 전달 받은 값이 없으면 가장 최근에 본 시험 정보 가져옴
            round = list.get(0).getRound();
            subject = list.get(0).getSubject();

            ReportExamDTO report = reportService.getTest(uid, round, subject);
            model.addAttribute("report", report);
            model.addAttribute("round", round);
            model.addAttribute("subject", subject);

        }

        model.addAttribute("view", "report/report_detail");
        return "index";
    }

    /**응시 이력 없으면 알럿창으로 이동*/
    @GetMapping("/report_alert")
    public String reportAlert(){
        return "report/report_alert";
    }


    /**정오표 - 서답형 미포함 리스트*/
    @GetMapping("/reportdetaillist/{ut_id}/{eid}")
    @ResponseBody
    public List<ReportQuestionDTO> getReportDetailList(@PathVariable("ut_id") Long ut_id
            , @PathVariable("eid") Long eid
    ){
        // 정오표 - 서답형 제외
        List<ReportQuestionDTO> detailList
                = reportService.getReportDetailList(ut_id, eid);

        return detailList;
    }

    /**정오표 - 서답형 리스트*/
    @GetMapping("/subjectivelist/{ut_id}/{eid}")
    @ResponseBody
    public List<ReportQuestionDTO> getSubjectiveList(@PathVariable("ut_id") Long ut_id
            , @PathVariable("eid") Long eid
    ){
        // 정오표 - 서답형 리스트
        List<ReportQuestionDTO> subjectiveList
                = reportService.getSubjectiveList(ut_id, eid);

        return subjectiveList;
    }

    /**문항 난이도별 성취율*/
    @GetMapping("/levelrate/{ut_id}/{eid}")
    @ResponseBody
    public List<Map<String, Object>> getLevelRate(@PathVariable("ut_id") Long ut_id
            , @PathVariable("eid") Long eid
    ){


        // 문항 난이도별 전체 성취율
        Map<String, Object> LevelRateAll = reportService.getLevelRateAll(eid);

        // 문항 난이도별 내 성취율
        Map<String, Object> LevelRateMe = reportService.getLevelRateMe(ut_id);

        List<Map<String, Object>> levelRate = new ArrayList<>();
        levelRate.add(LevelRateAll);
        levelRate.add(LevelRateMe);

        return levelRate;
    }

    /**교과 내용 영역별 성취율*/
    @GetMapping("/contentrate/{ut_id}/{eid}")
    @ResponseBody
    public List<Map<String, Object>> getContentRate(@PathVariable("ut_id") Long ut_id
            , @PathVariable("eid") Long eid
    ){
        // 교과 내용 영역별 전체 평균
        Map<String, Object> contentRateAll = reportService.getContentRateAll(eid);

        // 교과 내용 영역별 나의 성취율
        Map<String, Object> contentRateMe = reportService.getContentRateMe(ut_id);

        List<Map<String, Object>> contentRate = new ArrayList<>();
        contentRate.add(contentRateAll);
        contentRate.add(contentRateMe);

        return contentRate;

    }

    /**응답 유형별 정답률*/
    @GetMapping("/resprate/{ut_id}/{eid}")
    @ResponseBody
    public List<Map<String, Object>> getRespRate(@PathVariable("ut_id") Long ut_id
            , @PathVariable("eid") Long eid
    ){
        // 응답유형별 전체 평균
        Map<String, Object> respRateAll = reportService.getRespRateAll(eid);

        // 응답유형별 나의 성취율
        Map<String, Object> respRateMe = reportService.getRespRateMe(ut_id);

        List<Map<String, Object>> respRate = new ArrayList<>();
        respRate.add(respRateAll);
        respRate.add(respRateMe);

        return respRate;

    }

    /**정오표 - 상세보기*/
    @GetMapping("/report_question/{qid}")
    public String questionView(@PathVariable("qid") Long qid){
        return "/report/report_question_view";
    }

}
