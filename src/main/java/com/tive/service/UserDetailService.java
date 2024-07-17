package com.tive.service;

import com.tive.domain.Users;
import com.tive.repository.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailService implements UserDetailsService {

    private final UsersRepository repository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("username>>>>> {}",email);

        Users findUser = repository.findByEmail(email);

        if (findUser == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        log.info("..........findUser NAME...{}", findUser.getEmail());
        log.info("..........findUser PWD...{}", findUser.getPwd());


        return new CustomUserDetails(findUser);
        /*if (findUser!=null)
            return new CustomUserDetails(findUser);

        return null;*/
    }
}
