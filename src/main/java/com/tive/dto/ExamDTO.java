package com.tive.dto;

import com.tive.domain.SchoolLV;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ExamDTO {
    private Long eid;
    private String examName;
    private SchoolLV schoolLevel;
    private String subject;
    private Integer round;
    private Integer itemCount;
    private LocalDateTime createDate;
    private Integer testTime;
    private String year;
}
