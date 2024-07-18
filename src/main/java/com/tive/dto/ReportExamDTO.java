package com.tive.dto;

import com.tive.domain.SchoolLV;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportExamDTO {

    private Long uid;
    private Long utId;
    private Long eid;
    private LocalDateTime examDate;
    private Integer countCorrect;

    private String name;
//    private SchoolLV schoolLevel;

    private Integer itemCount;


    private int achievementRate;
    private int achievementLevel;
}
