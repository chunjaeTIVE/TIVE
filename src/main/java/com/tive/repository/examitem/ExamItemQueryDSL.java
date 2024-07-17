package com.tive.repository.examitem;

import com.tive.dto.ExamDTO;

import java.util.List;

public interface ExamItemQueryDSL {
    List<ExamDTO> findExamList();
}
