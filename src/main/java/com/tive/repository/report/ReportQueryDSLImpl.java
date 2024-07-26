package com.tive.repository.report;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import static com.tive.domain.QQuestionCategory.*;

import com.tive.dto.QuestionDTO;
import com.tive.dto.ReportExamDTO;
import com.tive.dto.ReportQuestionDTO;
import com.tive.dto.UsersDTO;
import jakarta.transaction.Transactional;
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
    public List<ReportExamDTO> getTest(Long uid) {

        List<ReportExamDTO> list = queryFactory.select(Projections.fields(ReportExamDTO.class
                        , userTest.utToUsers.uid
                        , userTest.utId
                        , userTest.utToExam.eid
                        , userTest.examDate
                        , userTest.countCorrect
                        , users.name
                        , users.schoolLevel
                        , examItem.itemCount
                        , examItem.subject
                        , examItem.round))
                .from(userTest)
                .innerJoin(examItem)
                .on(userTest.utToExam.eid.eq(examItem.eid))
                .innerJoin(users)
                .on(userTest.utToUsers.uid.eq(users.uid))
                .where(userTest.utToUsers.uid.eq(uid)
                        .and(examItem.useYn.eq("Y")))
                .orderBy(userTest.examDate.desc())
                .fetch();


        return list;
    }


    @Override
    public Integer getScore(Long utId) {
        Integer score = queryFactory
                .select(questionItem.points.sum())
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid))
                .where(userAnswer.uaToUt.utId.eq(utId).and(userAnswer.correct.eq(1)))
                .groupBy(userAnswer.correct)
                .fetchOne();

        if (score == null) {
            score = 0;
        }

        return score;
    }

    @Override
    @Transactional
    public List<ReportQuestionDTO> getReportDetailList(Long utId) {
        List<ReportQuestionDTO> list = queryFactory.select(Projections.fields(ReportQuestionDTO.class
                        , questionItem.qid
                        , questionItem.orderName
                        , questionCategory.categoryName
                        , questionItem.answer
                        , userAnswer.userAns
                        , userAnswer.correct
                        , questionItem.qType)
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid))
                .innerJoin(questionCategory)
                .on(questionItem.contentArea.eq(questionCategory.categoryCode))
                .where(userAnswer.uaToUt.utId.eq(utId)
                        .and(questionItem.orderName.notLike("서답형%"))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .orderBy(questionItem.order.asc())
                .fetch();

        return list;
    }

    @Override
    @Transactional
    public List<ReportQuestionDTO> getSubjectiveList(Long ut_id) {
        List<ReportQuestionDTO> list = queryFactory.select(Projections.fields(ReportQuestionDTO.class
                        , questionItem.qid
                        , questionItem.orderName
                        , questionCategory.categoryName
                        , questionItem.answer
                        , userAnswer.userAns
                        , userAnswer.correct
                        , questionItem.qType)
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid))
                .innerJoin(questionCategory)
                .on(questionItem.contentArea.eq(questionCategory.categoryCode))
                .where(userAnswer.uaToUt.utId.eq(ut_id)
                        .and(questionItem.orderName.like("서답형%"))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
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
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(questionItem.questionToExam.eid.eq(eid)
                                .and(questionItem.orderName.notLike("서답형%"))
                                .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull()))))
                .groupBy(questionItem.qid)
                .orderBy(questionItem.order.asc())
                .fetch();

        return avg;
    }

    @Override
    public List<Tuple> getSubjectiveAvgAll(Long eid) {
        List<Tuple> avg = queryFactory
                .select(questionItem.qid
                        , userAnswer.correct.sum().divide(questionItem.qid.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(questionItem.questionToExam.eid.eq(eid)
                                .and(questionItem.orderName.like("서답형%"))
                                .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull()))))
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
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(questionItem.questionToExam.eid.eq(eid))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
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
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(userAnswer.uaToUt.utId.eq(ut_id))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .groupBy(questionItem.difficulty)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getContentRateAll(Long eid) {
        List<Tuple> rate = queryFactory
                .select(questionCategory.categoryName
                        , userAnswer.correct.sum().divide(questionItem.contentArea.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(questionItem.questionToExam.eid.eq(eid))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .innerJoin(questionCategory)
                .on(questionItem.contentArea.eq(questionCategory.categoryCode))
                .groupBy(questionItem.contentArea)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getContentRateMe(Long ut_id) {
        List<Tuple> rate = queryFactory
                .select(questionCategory.categoryName
                        , userAnswer.correct.sum().divide(questionItem.contentArea.count())
                                .multiply(100).round()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(userAnswer.uaToUt.utId.eq(ut_id))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .innerJoin(questionCategory)
                .on(questionItem.contentArea.eq(questionCategory.categoryCode))
                .groupBy(questionItem.contentArea)
                .fetch();


        return rate;
    }

    @Override
    public List<Tuple> getRespRateAll(Long eid) {
        List<Tuple> rate = queryFactory
                .select(questionItem.qType
                        , userAnswer.correct.sum()
                        , questionItem.qType.count()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(questionItem.questionToExam.eid.eq(eid))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .groupBy(questionItem.qType)
                .fetch();

        return rate;
    }

    @Override
    public List<Tuple> getRespRateMe(Long ut_id) {
        List<Tuple> rate = queryFactory
                .select(questionItem.qType
                        , userAnswer.correct.sum()
                        , questionItem.qType.count()
                )
                .from(userAnswer)
                .innerJoin(questionItem)
                .on(userAnswer.uaToQuestion.qid.eq(questionItem.qid)
                        .and(userAnswer.uaToUt.utId.eq(ut_id))
                        .and(questionItem.status.in(13, 12, 11).or(questionItem.status.isNull())))
                .groupBy(questionItem.qType)
                .fetch();


        return rate;
    }

    @Override
    public QuestionDTO findByqId(Long qid) {
        QuestionDTO dto = queryFactory.select(Projections.fields(QuestionDTO.class
                        , questionItem.qid
                        , questionItem.qContents
                        , questionItem.qType
                        , questionItem.answer
                        , questionItem.commentary))
                .from(questionItem)
                .where(questionItem.qid.eq(qid))
                .fetchOne();
        return dto;
    }

    @Override
    public List<UsersDTO> findRanking() {
        List<UsersDTO> list = queryFactory.select(Projections.fields(UsersDTO.class
                        , userTest.score.avg().as("avgScore")
                        , userTest.localCode
                        , users.localName))
                .from(userTest)
                .innerJoin(users)
                .on(userTest.utToUsers.uid.eq(users.uid))
                .where(userTest.localCode.isNotNull())
                .groupBy(userTest.localCode)
                .orderBy(userTest.score.avg().desc())
                .fetch();
        return list;
    }
}
