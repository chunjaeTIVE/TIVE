package com.tive.repository.usertestans;

import com.tive.domain.UserAnswer;

import java.util.List;

public interface UserAnswerQueryDSL {
    List<UserAnswer> findByUserExam(Long uid, Long eid);
}
