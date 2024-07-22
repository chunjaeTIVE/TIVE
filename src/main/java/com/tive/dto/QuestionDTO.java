package com.tive.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
    private Long qid;
    private String qType;
    private String qContents;
    private String orderName;
    private String examName;
    private Long eid;
    private Integer order;
}
