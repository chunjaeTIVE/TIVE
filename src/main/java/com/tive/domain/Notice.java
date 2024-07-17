package com.tive.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nid;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false,columnDefinition = "longtext")
    private String content;

    @Column(nullable = false)
    private String category;

    @CreatedDate
    @Column(name = "create_date",nullable = false)
    private LocalDateTime createDate;

    @Builder
    public Notice(String title, String content, String category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }
}