package com.tive.service;

import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import com.tive.repository.examitem.ExamItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService{
    private final ExamItemRepository examItemRepository;
    @Override
    public List<ExamDTO> findExamList() {
        List<ExamDTO> list = examItemRepository.findExamList();
        return list;
    }

    @Override
    public List<QuestionDTO> findExam(Long eid) {
        List<QuestionDTO> exam = examItemRepository.findExam(eid);
        return exam;
    }

    @Override
    public ExamDTO findExamInfo(String userSL, String subject, int examKind) {
        ExamDTO examInfo = examItemRepository.findExamInfo(userSL, subject, examKind);
        return examInfo;
    }


}
