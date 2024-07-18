package com.tive.repository.report;

import com.querydsl.core.Tuple;
import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;

import java.util.List;

public interface ReportQueryDSL {
    ReportExamDTO getTest(Long uid, int round, String subject);

    List<ReportQuestionDTO> getReportDetailList(Long utId);

    List<Tuple> getAvgAll(Long eid);

    List<Tuple> getLevelRateAll(Long eid);

    List<Tuple> getLevelRateMe(Long ut_id);

    List<Tuple> getContentRateAll(Long eid);

    List<Tuple> getContentRateMe(Long ut_id);

    List<Tuple> getRespRateAll(Long eid);

    List<Tuple> getRespRateMe(Long ut_id);

}
