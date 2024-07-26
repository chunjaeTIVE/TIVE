package com.tive.repository.usertestans;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.tive.domain.QUserAnswer.*;

import static com.tive.domain.QQuestionItem.*;

import static com.tive.domain.QUserTest.*;
import com.tive.domain.UserAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserAnswerQueryDSLImpl implements UserAnswerQueryDSL {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<UserAnswer> findByUserExam(Long uid, Long eid) {
        List<UserAnswer> fetch = queryFactory.select(userAnswer)
//                .select(userAnswer.uaId, userAnswer.uaToUsers
//                        , userAnswer.uaToQuestion, userAnswer.userAns, userAnswer.correct, userAnswer.uaToUt)
                .from(userAnswer)
                .innerJoin(userAnswer.uaToUt, userTest)
                .where(userAnswer.uaToUsers.uid.eq(uid))
                .where(userTest.utToExam.eid.eq(eid))
                .fetch();
        return fetch;
    }
}
