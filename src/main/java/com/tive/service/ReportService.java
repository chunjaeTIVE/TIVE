package com.tive.service;

import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;

import java.util.List;
import java.util.Map;

public interface ReportService {
    ReportExamDTO getTest(Long uid, int round, String subject);

    List<ReportQuestionDTO> getReportDetailList(Long utId, Long eid);

    Map<String, Object> getLevelRateAll(Long eid);

    Map<String, Object> getLevelRateMe(Long ut_id);

    Map<String, Object> getContentRateAll(Long eid);

    Map<String, Object> getContentRateMe(Long ut_id);

    Map<String, Object> getRespRateAll(Long eid);

    Map<String, Object> getRespRateMe(Long ut_id);

    List<ReportQuestionDTO> getSubjectiveList(Long ut_id, Long eid);
}
