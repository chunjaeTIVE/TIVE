package com.tive.controller;

import com.tive.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/check")
@RequiredArgsConstructor
@Slf4j
public class AgreeController { //마케팅 동의 컨트롤러

    private final UserService userService;

    @GetMapping("/users/agree")
    public ResponseEntity<String> updateAgreeStatus(Principal principal) {
        try {
//            log.info("useremail..........yes{}", principal.getName());
            userService.updateAgreeByEmail(principal.getName()); //현재 로그인한 사용자의 이메일에 해당하는 agree변경
            return ResponseEntity.ok("마케팅 여부 동의 완료");
        } catch (Exception e) {
//            log.info("useremail..........nono{}", principal.getName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("마케팅 여부 동의 실패");
        }
    }
}