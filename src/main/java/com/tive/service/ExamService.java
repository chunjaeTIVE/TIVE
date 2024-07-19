package com.tive.service;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;

import java.util.List;

public interface ExamService {
    List<ExamDTO> findExamList();

    List<QuestionDTO> findExam(Long eid);
}
