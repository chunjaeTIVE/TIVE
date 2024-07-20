package com.tive.controller;

import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import com.tive.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReportController {

    private final ReportService reportService;

    /**기본 리포트로 이동*/
    @GetMapping("/report_basic/{uid}")
    public String reportBasic(@PathVariable("uid") Long uid
            , @RequestParam(name = "round", required = false, defaultValue = "1") int round
            , @RequestParam(name = "subject", required = false, defaultValue = "국어") String subject
            , Model model
    ){
        // 시험 기본 정보 가져오기
        ReportExamDTO report = reportService.getTest(uid, round, subject);

        // 정오표 - 서답형 제외
        List<ReportQuestionDTO> detailList
                = reportService.getReportDetailList(report.getUtId(), report.getEid());

        model.addAttribute("report", report);
        model.addAttribute("detailList", detailList);
        model.addAttribute("subject", subject);

        return "report/report_basic";
    }



    /**상세 리포트로 이동*/
    @GetMapping("/report_detail/{uid}")
    public String reportDetail(@PathVariable("uid") Long uid
            , @RequestParam(name = "round", required = false, defaultValue = "1") int round
            , @RequestParam(name = "subject", required = false, defaultValue = "국어") String subject
            , Model model
    ) {

        // 시험 기본 정보 가져오기
        ReportExamDTO report = reportService.getTest(uid, round, subject);

        model.addAttribute("report", report);
        model.addAttribute("subject", subject);

        return "report/report_detail";
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

}
