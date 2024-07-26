package com.tive.service;

import com.tive.dto.QuestionDTO;
import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import com.tive.dto.UsersDTO;

import java.util.List;
import java.util.Map;

public interface ReportService {
    List<ReportExamDTO> getTest(Long uid);

    List<ReportQuestionDTO> getReportDetailList(Long utId, Long eid);

    Map<String, Object> getLevelRateAll(Long eid);

    Map<String, Object> getLevelRateMe(Long ut_id);

    Map<String, Object> getContentRateAll(Long eid);

    Map<String, Object> getContentRateMe(Long ut_id);

    Map<String, Object> getRespRateAll(Long eid);

    Map<String, Object> getRespRateMe(Long ut_id);

    List<ReportQuestionDTO> getSubjectiveList(Long ut_id, Long eid);

    QuestionDTO findQuestion(Long qid);

    List<UsersDTO> findRanking();
}
