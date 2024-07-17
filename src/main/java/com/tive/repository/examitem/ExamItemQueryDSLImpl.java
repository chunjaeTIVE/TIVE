package com.tive.repository.examitem;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tive.domain.QExamItem.*;
import com.tive.dto.ExamDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.querydsl.core.types.Projections;

import java.util.List;

import static com.tive.domain.QExamItem.examItem;

@Repository
@RequiredArgsConstructor
public class ExamItemQueryDSLImpl implements ExamItemQueryDSL{
    private final JPAQueryFactory queryFactory;
    @Override
    public List<ExamDTO> findExamList() {
        List<ExamDTO> list = queryFactory.select(Projections.fields(ExamDTO.class
                        , examItem.eid
                        , examItem.examName
                        , examItem.schoolLevel
                        , examItem.subject
                        , examItem.round
                        , examItem.itemCount
                        , examItem.createDate
                        , examItem.testTime
                        , examItem.year))
                .from(examItem)
                .fetch();
        return list;
    }
}
