package com.tive.repository.users;

import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.tive.domain.QUsers.*;
import static com.tive.domain.QUserTest.*;

import com.tive.domain.UserTest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UsersQueryDSLImpl implements UsersQueryDSL {

    private final JPAQueryFactory queryFactory;

    @Override
    public Long emailCheck(String email) {
        Long emailCk = queryFactory.select(users.email.count())
                .from(users)
                .where(users.email.eq(email))
                .fetchOne();

        return emailCk;
    }

    @Override
    public boolean existsByUserIdAndExamId(Long uid, Long eid) {
        Integer count = queryFactory.selectOne()
                .from(userTest)
                .where(userTest.utToUsers.uid.eq(uid).and(userTest.utToExam.eid.eq(eid)))
                .fetchFirst();

        return count!=null;
    }
}
