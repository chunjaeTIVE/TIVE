package com.tive.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportQuestionDTO {
    private Long qid;
    private String orderName;
    private String categoryName;
    private String answer;
    private String userAns;
    private Integer correct;

    private int avgAll;
}
