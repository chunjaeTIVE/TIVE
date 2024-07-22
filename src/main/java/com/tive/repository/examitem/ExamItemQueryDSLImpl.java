package com.tive.repository.examitem;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tive.domain.SchoolLV;
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
public class ExamItemQueryDSLImpl implements ExamItemQueryDSL {
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
    public List<QuestionDTO> findExam(Long eid) {
        List<QuestionDTO> list = queryFactory.select(Projections.fields(QuestionDTO.class
                        , questionItem.qid
                        , questionItem.qType
                        , questionItem.qContents
                        , questionItem.orderName
                        , questionItem.order
                        , examItem.examName
                        , examItem.eid
                )).from(questionItem)
                .innerJoin(questionItem.questionToExam, examItem)
                .where(examItem.eid.eq(eid))
                .fetch();
        return list;
    }

    @Override
    public ExamDTO findExamInfo(String userSL, String subject, int examKind) {
        ExamDTO dto = queryFactory.select(Projections.fields(ExamDTO.class
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
                .where(examItem.schoolLevel.eq(SchoolLV.valueOf(userSL))
                        .and(examItem.subject.eq(subject))
                        .and(examItem.round.eq(examKind))
                        .and(examItem.useYn.eq("Y")))
                .limit(1)
                .orderBy(examItem.year.desc())
                .fetchOne();
        return dto;
    }


}
