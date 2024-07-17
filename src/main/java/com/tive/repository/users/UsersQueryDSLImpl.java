package com.tive.repository.users;

import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.tive.domain.QUsers.*;
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
}
