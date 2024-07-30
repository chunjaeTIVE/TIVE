package com.tive.repository.examitem;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;

import java.util.List;

public interface ExamItemQueryDSL {
    ExamDTO findExamByEid(Long eid);

    List<QuestionDTO> findExam(Long eid);

    ExamDTO findExamInfo(String userSL, String subject, int examKind);
}
