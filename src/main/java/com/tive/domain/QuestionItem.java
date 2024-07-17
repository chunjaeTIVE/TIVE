package com.tive.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Table(name="question_item")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;
    @Column(nullable = false,columnDefinition = "longtext")
    private String article;
    @Column(name="question_type",nullable = false)
    private String qType;
    @Column(nullable = false)
    private String difficulty;
    @Column(name="content_area",nullable = false)
    private String contentArea;
    @Column(name="action_area",nullable = false)
    private String actionArea;
    @Column(nullable = false)
    private String competency;
    @Column(nullable = false,columnDefinition = "longtext")
    private String answer;
    @Column(nullable = false)
    private Integer order;
    @Column(name="question_contents",nullable = false,columnDefinition = "longtext")
    private String qContents;
    @Column(nullable = false)
    private Integer points;
    @Column(name="create_date" ,nullable = false)
    @CreatedDate
    private LocalDateTime createDate;
    @Column(name="update_date",nullable = false)
    @LastModifiedDate
    private LocalDateTime updateDate;
    @Column(name="item_answer_text",nullable = false,columnDefinition = "longtext")
    private String itemAnsText;
    @Column(name="data_search_type",nullable = false, length = 4)
    private Character search;
    @Column(nullable = false,columnDefinition = "longtext")
    private String commentary;
    @Column(nullable = false)
    private Integer status;
    @Column(name="order_name",nullable = false)
    private String orderName;
    @Column(name="integrated_item_type",nullable = false, length = 4)
    private String integrated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="eid")
    private ExamItem questionToExam;


}
