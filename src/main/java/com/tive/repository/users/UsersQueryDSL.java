package com.tive.repository.users;

public interface UsersQueryDSL {

    Long emailCheck(String email);

    boolean existsByUserIdAndExamId(Long uid, Long eid);
}
