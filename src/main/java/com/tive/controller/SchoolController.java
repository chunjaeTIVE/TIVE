package com.tive.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.SSLContext;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@Slf4j
public class SchoolController {

    @Value("${api.key}")
    private String apiKey;

    @GetMapping("/schools")
    public @ResponseBody ResponseEntity<List<HashMap<String,Object>>> getSchools(
            @RequestParam(required = false) int localCode
    ) {
        int perPage = 5000;
        int totalPages = 4; // Total pages to fetch (4 pages * 5000 per page = 20000 records)
        String apiUrl = "https://api.odcloud.kr/api/15099519/v1/uddi:67b6f3ba-4c66-4abe-83cc-836aab02c337";

        HashMap<String, Object> stringObjectHashMap;
        List<HashMap<String,Object>> result = new ArrayList<>();

        try {
            SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
            sslContext.init(null, null, new java.security.SecureRandom());
            HttpClient client = HttpClient.newBuilder()
                    .sslContext(sslContext)
                    .build();

            for (int page = 1; page <= totalPages; page++) {
                String requestUrl = apiUrl + "?page=" + page + "&perPage=" + perPage;
                System.out.println("Request URL: " + requestUrl);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(requestUrl))
                        .header("Authorization", "Infuser " + apiKey)
                        .header("content-type", "application/json; charset=UTF-8")
                        .GET()
                        .build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                System.out.println("Response Body: " + response.body());
                stringObjectHashMap = new ObjectMapper().readValue(response.body(), new TypeReference<HashMap<String, Object>>() {});
                Set<String> keys = Set.of("경도", "소재지도로명주소", "소재지지번주소", "시도교육청명", "시도교육청코드", "위도", "학교ID", "학교급구분", "학교명");

                List<HashMap<String,Object>> data = (List<HashMap<String, Object>>) stringObjectHashMap.get("data");

                if (localCode != 0) {
                    log.info("localCode..........{}", localCode);

                    for (HashMap<String, Object> map : data) {
                        map.keySet().retainAll(keys); // 필요한 키만 남기고 제거
                    }
                    for (HashMap<String,Object> hm : data) {
                        if (localCode == (int) hm.get("시도교육청코드")) {
                            result.add(hm);
                        }
                    }
                } else {
                    for (HashMap<String, Object> map : data) {
                        map.keySet().retainAll(keys); // 필요한 키만 남기고 제거
                    }
                    result.addAll(data);
                }
            }
            log.info("test..........{}", result);
        } catch (Exception e) {
            System.out.println("에러 발생: " + e);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
