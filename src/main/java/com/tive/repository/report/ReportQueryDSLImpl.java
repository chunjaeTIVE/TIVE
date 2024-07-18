package com.tive.repository.report;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import static com.tive.domain.QExamItem.*;
import static com.tive.domain.QQuestionItem.*;
import static com.tive.domain.QUsers.*;
import static com.tive.domain.QUserAnswer.*;
import static com.tive.domain.QUserTest.*;

@RequiredArgsConstructor
@Slf4j
public class ReportQueryDSLImpl implements ReportQueryDSL {

    private final JPAQueryFactory queryFactory;

    @Override
    public ReportExamDTO getTest(Long uid, int round, String subject) {

        ReportExamDTO reportDTO = queryFactory.select(Projections.fields(ReportExamDTO.class
                        , userTest.utToUsers.uid
                        , userTest.utId
                        , userTest.utToExam.eid
                        , userTest.examDate
                        , userTest.countCorrect
                        , users.name
//                        , users.schoolLevel
                        , examItem.itemCount))
                .from(userTest)
                .innerJoin(examItem)
                .on(userTest.utToExam.eid.eq(examItem.eid))
                .innerJoin(users)
                .on(userTest.utToUsers.uid.eq(users.uid))
                .where(userTest.utToUsers.uid.eq(uid)
                        .and(examItem.round.eq(round))
                        .and(examItem.subject.eq(subject)))
                .orderBy(userTest.examDate.desc())
                .limit(1)
                .fetchOne();


        return reportDTO;
    }

    @Override
    public List<ReportQuestionDTO> getReportDetailList(Long utId) {
        List<ReportQuestionDTO> list = queryFactory.select(Projections.fields(ReportQuestionDTO.class
                        , questionItem.qid
                        , questionItem.order
                        , questionItem.contentArea
                        , questionItem.answer
                        , userAnswer.userAns
                        , userAnswer.correct)
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid))
                .where(userAnswer.uaToUt.utId.eq(utId))
                .orderBy(questionItem.order.asc())
                .fetch();

        return list;
    }

    @Override
    public List<Tuple> getAvgAll(Long eid) {
        List<Tuple> avg = queryFactory
                .select(questionItem.qid
                        , userAnswer.correct.sum().divide(questionItem.qid.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(questionItem.questionToExam.eid.eq(eid)))
                .groupBy(questionItem.qid)
                .orderBy(questionItem.order.asc())
                .fetch();

        return avg;
    }

    @Override
    public List<Tuple> getLevelRateAll(Long eid) {

        List<Tuple> rate = queryFactory
                .select(questionItem.difficulty
                        , userAnswer.correct.sum().divide(questionItem.difficulty.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(questionItem.questionToExam.eid.eq(eid)))
                .groupBy(questionItem.difficulty)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getLevelRateMe(Long ut_id) {

        List<Tuple> rate = queryFactory
                .select(questionItem.difficulty
                        , userAnswer.correct.sum().divide(questionItem.difficulty.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(userAnswer.uaToUt.utId.eq(ut_id)))
                .groupBy(questionItem.difficulty)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getContentRateAll(Long eid) {
        List<Tuple> rate = queryFactory
                .select(questionItem.contentArea
                        , userAnswer.correct.sum().divide(questionItem.contentArea.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(questionItem.questionToExam.eid.eq(eid)))
                .groupBy(questionItem.contentArea)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getContentRateMe(Long ut_id) {
        List<Tuple> rate = queryFactory
                .select(questionItem.contentArea
                        , userAnswer.correct.sum().divide(questionItem.contentArea.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(userAnswer.uaToUt.utId.eq(ut_id)))
                .groupBy(questionItem.contentArea)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getRespRateAll(Long eid) {
        List<Tuple> rate = queryFactory
                .select(questionItem.qType
                        , userAnswer.correct.sum().divide(questionItem.qType.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(questionItem.questionToExam.eid.eq(eid)))
                .groupBy(questionItem.qType)
                .fetch();

        return rate;
    }

    @Override
    public List<Tuple> getRespRateMe(Long ut_id) {
        List<Tuple> rate = queryFactory
                .select(questionItem.qType
                        , userAnswer.correct.sum().divide(questionItem.qType.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid).and(userAnswer.uaToUt.utId.eq(ut_id)))
                .groupBy(questionItem.qType)
                .fetch();


        return rate;
    }

}


