package com.tive.service;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.dto.UsersDTO;

import java.util.HashMap;
import java.util.List;

public interface ExamService {
    List<ExamDTO> findExamList();

    List<QuestionDTO> findExam(Long eid);

    ExamDTO findExamInfo(String userSL, String subject, int examKind);

    Long submitExam(String email, HashMap<String, Object> hm);

    int addScore(Long utid);
}
