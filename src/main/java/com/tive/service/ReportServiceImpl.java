package com.tive.service;

import com.querydsl.core.Tuple;
import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import com.tive.repository.report.ReportRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;


    /**
     * 유저의 시험 기본 정보 가져오기
     */
    @Override
    public List<ReportExamDTO> getTest(Long uid) {
        List<ReportExamDTO> list = reportRepository.getTest(uid);


        for (int i = 0; i < list.size(); i++) {


            //종합성취율, 평가레벨
            int rate = Math.round((list.get(i).getCountCorrect() / (float) list.get(i).getItemCount()) * 100);
            int level = 1;

            if (rate >= 80) level = 4;
            else if (rate >= 50) level = 3;
            else if (rate >= 20) level = 2;
            else level = 1;

            list.get(i).setAchievementRate(rate);
            list.get(i).setAchievementLevel(level);

            // 점수

            int score = reportRepository.getScore(list.get(i).getUtId());


            list.get(i).setScore(score);

        }

        return list;
    }

    /**
     * 정오표 - 서답형 제외
     */
    @Override
    @Transactional
    public List<ReportQuestionDTO> getReportDetailList(Long utId, Long eid) {
        // 문항데이터
        List<ReportQuestionDTO> list = reportRepository.getReportDetailList(utId);

        // 전체 평균
        List<Tuple> results = reportRepository.getAvgAll(eid);


        for (int i = 0; i < list.size(); i++) {

            int avgAll = (int) Math.round(results.get(i).get(1, Double.class));

            list.get(i).setAvgAll(avgAll);
        }

        return list;
    }

    /**
     * 정오표 - 서답형
     */
    @Override
    @Transactional
    public List<ReportQuestionDTO> getSubjectiveList(Long ut_id, Long eid) {

        // 문항데이터
        List<ReportQuestionDTO> list = reportRepository.getSubjectiveList(ut_id);

        // 전체 평균
        List<Tuple> results = reportRepository.getSubjectiveAvgAll(eid);

        for (int i = 0; i < list.size(); i++) {

            int avgAll = (int) Math.round(results.get(i).get(1, Double.class));

            list.get(i).setAvgAll(avgAll);
        }

        return list;
    }


    /**
     * 문항 난이도별 전체 성취율
     */
    @Override
    public Map<String, Object> getLevelRateAll(Long eid) {

        List<Tuple> results = reportRepository.getLevelRateAll(eid);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String difficulty = result.get(0, String.class);
            String diff_text = "";
            if ("DF01".equals(difficulty)) {
                diff_text = "최상";
            } else if ("DF02".equals(difficulty)) {
                diff_text = "상";
            } else if ("DF03".equals(difficulty)) {
                diff_text = "중";
            } else if ("DF04".equals(difficulty)) {
                diff_text = "하";
            } else {
                diff_text = "최하";
            }
            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(diff_text, achievementRate);
        }

        return data;
    }

    /**
     * 문항 난이도별 나의 성취율
     */
    @Override
    public Map<String, Object> getLevelRateMe(Long ut_id) {

        List<Tuple> results = reportRepository.getLevelRateMe(ut_id);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String difficulty = result.get(0, String.class);
            String diff_text = "";
            if ("DF01".equals(difficulty)) {
                diff_text = "최상";
            } else if ("DF02".equals(difficulty)) {
                diff_text = "상";
            } else if ("DF03".equals(difficulty)) {
                diff_text = "중";
            } else if ("DF04".equals(difficulty)) {
                diff_text = "하";
            } else {
                diff_text = "최하";
            }
            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(diff_text, achievementRate);
        }

        return data;
    }

    /**
     * 교과 내용 영역별 전체 평균
     */
    @Override
    public Map<String, Object> getContentRateAll(Long eid) {

        List<Tuple> results = reportRepository.getContentRateAll(eid);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String difficulty = result.get(0, String.class);
            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(difficulty, achievementRate);
        }

        return data;
    }

    /**
     * 교과 내용 영역별 나의 성취율
     */
    @Override
    public Map<String, Object> getContentRateMe(Long ut_id) {
        List<Tuple> results = reportRepository.getContentRateMe(ut_id);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String difficulty = result.get(0, String.class);
            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(difficulty, achievementRate);
        }

        return data;
    }

    /**
     * 응답유형별 전체 평균
     */
    @Override
    public Map<String, Object> getRespRateAll(Long eid) {

        List<Tuple> results = reportRepository.getRespRateAll(eid);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String resp = result.get(0, String.class);
            String qtype = "";
            if ("IT01".equals(resp) || "IT02".equals(resp) || "IT18".equals(resp)) {
                qtype = "선다형";
            } else if ("IT09".equals(resp) || "IT12".equals(resp)) {
                qtype = "단답형";
            } else if ("IT10".equals(resp) || "IT13".equals(resp) || "IT14".equals(resp) || "IT15".equals(resp) || "IT17".equals(resp)) {
                qtype = "서술형";
            } else if ("IT11".equals(resp)) {
                qtype = "확장 선택형";
            } else if ("IT16".equals(resp) || "TT07".equals(resp)) {
                qtype = "순서 배열형";
            } else if ("TT03".equals(resp)) {
                qtype = "자료 연결형";
            } else if ("TT04".equals(resp)) {
                qtype = "아래로 펼치기";
            } else if ("TT11".equals(resp)) {
                qtype = "수정형";
            } else {
                qtype = "선다형";
            }

            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(qtype, achievementRate);
        }

        return data;
    }

    /**
     * 응답유형별 나의 성취율
     */
    @Override
    public Map<String, Object> getRespRateMe(Long ut_id) {
        List<Tuple> results = reportRepository.getRespRateMe(ut_id);

        Map<String, Object> data = new HashMap<>();

        for (Tuple result : results) {
            String resp = result.get(0, String.class);
            String qtype = "";
            if ("IT01".equals(resp) || "IT02".equals(resp) || "IT18".equals(resp)) {
                qtype = "선다형";
            } else if ("IT09".equals(resp) || "IT12".equals(resp)) {
                qtype = "단답형";
            } else if ("IT10".equals(resp) || "IT13".equals(resp) || "IT14".equals(resp) || "IT15".equals(resp) || "IT17".equals(resp)) {
                qtype = "서술형";
            } else if ("IT11".equals(resp)) {
                qtype = "확장선택형";
            } else if ("IT16".equals(resp) || "TT07".equals(resp)) {
                qtype = "순서 배열형";
            } else if ("TT03".equals(resp)) {
                qtype = "자료 연결형";
            } else if ("TT04".equals(resp)) {
                qtype = "아래로 펼치기";
            } else if ("TT11".equals(resp)) {
                qtype = "수정형";
            } else {
                qtype = "선다형";
            }

            int achievementRate = (int) Math.round(result.get(1, Double.class));
            data.put(qtype, achievementRate);
        }

        return data;
    }

}
