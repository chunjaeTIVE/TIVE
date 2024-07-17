package com.tive.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeDTO {
    private Long nid;
    private String title;
    private String content;
    private String category;
    private LocalDateTime createDate;
}
