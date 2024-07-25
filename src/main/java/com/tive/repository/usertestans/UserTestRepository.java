package com.tive.repository.usertestans;

import com.tive.domain.UserTest;
import com.tive.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTestRepository extends JpaRepository<UserTest,Long> , UserTestQueryDSL {
    @Query(" select t from UserTest t where t.utToUsers.uid=:uid and t.utToExam.eid=:eid ")
    UserTest findByUser(Long uid, Long eid);
}
