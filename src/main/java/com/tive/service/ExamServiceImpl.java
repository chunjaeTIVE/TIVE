package com.tive.service;

import com.tive.dto.ExamDTO;
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
}
