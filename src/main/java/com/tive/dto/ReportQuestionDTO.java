package com.tive.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportQuestionDTO {
    private Long qid;
    private Integer order;
    private String contentArea;
    private String answer;
    private String userAns;
    private Integer correct;

    private int avgAll;
}
