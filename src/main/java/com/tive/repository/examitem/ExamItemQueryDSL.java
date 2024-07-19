package com.tive.repository.examitem;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;

import java.util.List;

public interface ExamItemQueryDSL {
    List<ExamDTO> findExamList();

    List<QuestionDTO> findExam(Long eid);
}
