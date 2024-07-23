package com.tive.service;

import com.tive.dto.UsersDTO;
import jakarta.validation.Valid;

public interface UserService {
    Long join(@Valid UsersDTO dto);

    Long emailCheck(String email);

    UsersDTO getUserInfo(String email);

    void updateAgreeByEmail(String name);

    boolean hasTakenExam(Long uid, Long eid);
}
