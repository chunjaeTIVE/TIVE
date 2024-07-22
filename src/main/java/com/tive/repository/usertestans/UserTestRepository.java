package com.tive.repository.usertestans;

import com.tive.domain.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTestRepository extends JpaRepository<UserTest,Long> , UserTestQueryDSL {
}
