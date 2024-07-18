package com.tive.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TimeController {
    private final String WORLD_TIME_API_URL = "http://worldtimeapi.org/api/timezone/Asia/Seoul";
    @GetMapping("/current-time")
    public ResponseEntity<Map<String, Object>> getCurrentTime() {
        RestTemplate restTemplate = new RestTemplate();

        // 외부 API에서 JSON 형태로 응답을 받음
        Map<String, Object> responseBody = restTemplate.getForObject(WORLD_TIME_API_URL, Map.class);

        // JSON 형태로 응답을 클라이언트에게 반환
        return ResponseEntity.ok(responseBody);
    }
}
