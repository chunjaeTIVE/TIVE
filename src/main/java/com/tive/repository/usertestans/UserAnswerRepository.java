package com.tive.repository.usertestans;

import com.tive.domain.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long>,UserAnswerQueryDSL {
}
