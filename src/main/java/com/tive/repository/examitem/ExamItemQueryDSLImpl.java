package com.tive.repository.examitem;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tive.dto.ExamDTO;
import com.tive.dto.QuestionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.querydsl.core.types.Projections;

import java.util.List;

import static com.tive.domain.QExamItem.examItem;
import static com.tive.domain.QQuestionItem.questionItem;

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

    @Override
    public List<QuestionDTO> findExam() {
        List<QuestionDTO> list = queryFactory.select(Projections.fields(QuestionDTO.class
                        , questionItem.qid
                        , questionItem.qType
                        , questionItem.qContents
                        , questionItem.orderName
                        , examItem.examName
                        ,examItem.eid
                )).from(questionItem)
                .innerJoin(questionItem.questionToExam, examItem)
                .where(examItem.eid.eq(36L))
                .fetch();
        return list;
    }


}
