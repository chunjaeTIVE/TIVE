package com.tive.service;

import com.tive.domain.Users;
import com.tive.dto.UsersDTO;
import com.tive.repository.users.UsersRepository;
import jakarta.validation.constraints.NotEmpty;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {
        @Autowired
        private UserService userService;
        @Autowired
        private UsersRepository usersRepository;

        @Test
        public void t1(){
                Assertions.assertThat(userService.getUserInfo("qewqe")).isNotNull();
                System.out.println(userService.getUserInfo("qewqe").getEmail());
                //Users user = usersRepository.findByEmail("dfdfad");
                //System.out.println(user.getEmail());

        }
}