package com.tive.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="exam_item")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eid;
    @Column(name="exam_name",nullable = false)
    private String examName;
    @Enumerated(EnumType.STRING)
    @Column(name="school_level",nullable = false)
    private SchoolLV schoolLevel;
    @Column(nullable = false)
    private String subject;
    @Column(nullable = false)
    private Integer round;
    @Column(name="item_cnt", nullable = false)
    private Integer itemCount;
    @Column(name="create_date" ,nullable = false)
    @CreatedDate
    private LocalDateTime createDate;
    @Column(name="update_date",nullable = false)
    @LastModifiedDate
    private LocalDateTime updateDate;
    @Column(name="use_yn",nullable = false)
    private String useYn;
    @Column(name="test_time",nullable = false)
    private Integer testTime;
    @Column(nullable = false)
    private String year;

    @OneToMany(mappedBy = "questionToExam")
    List<QuestionItem> qItemList = new ArrayList<>();


}
