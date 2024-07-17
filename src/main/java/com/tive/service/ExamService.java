package com.tive.service;

import com.tive.dto.ExamDTO;

import java.util.List;

public interface ExamService {
    List<ExamDTO> findExamList();
}
