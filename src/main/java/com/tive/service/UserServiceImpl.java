package com.tive.service;

import com.tive.domain.SchoolLV;
import com.tive.domain.UserRole;
import com.tive.domain.Users;
import com.tive.dto.UsersDTO;
import com.tive.repository.users.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UsersRepository repository;

    private final ModelMapper modelMapper;
    private final PasswordEncoder encoder;

    /** 회원가입 */
    @Override
    public Long join(UsersDTO dto) {
        //비밀번호 암호화
        String pwd = encoder.encode(dto.getPwd());

        //UserRole, SchoolLV 설정
        UserRole userRole = UserRole.valueOf(dto.getRole());
        SchoolLV schoolLV = SchoolLV.valueOf(dto.getSchoolLevel());

        //이메일 중복 체크 UserDetailService랑 연결된거 / 이거 없어도 될거같은디 잘 모르겠으니까 일단 냄겨놓음
        boolean userCheck = findUserCheck(dto.getEmail());
        if (userCheck) {
            throw new RuntimeException("이미 있어");
        }

        //회원 정보 생성
        Users users = Users.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .pwd(pwd)
                .phone(dto.getPhone())
                .schoolLevel(schoolLV)
                .agree(dto.getAgree())
                .role(userRole)
                .build();

        Users savedUser = repository.save(users);

        return savedUser.getUid();
    }

    /** 이메일 중복체크 (js연결된거) */
    @Override
    public Long emailCheck(String email) {
        Long cnt = repository.emailCheck(email);
        return cnt;
    }

    @Override
    public UsersDTO getUserInfo(String email) {
        Users userinfo = repository.findByEmail(email);
        UsersDTO dto = modelMapper.map(userinfo, UsersDTO.class);
        return dto;
    }

    private boolean findUserCheck(String email) { //UserDetailService랑 연결된거
        Users users = repository.findByEmail(email);

        return users!=null;
    }


    @Transactional
    @Override
    public void updateAgreeByEmail(String email) {
        Users user = repository.findByEmail(email);

        if (user != null) {
            user.setAgree(1); // 마케팅 동의 여부를 1로 설정
            repository.save(user);
        } else {
            throw new RuntimeException("유저 정보를 찾을 수 없습니다 : " + email);
        }
    }

}
