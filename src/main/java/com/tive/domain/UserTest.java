package com.tive.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="user_test")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ut_id")
    private Long utId;
    @Column(name="exam_date",nullable = false)
    private LocalDateTime examDate;
    @Column(name="count_correct")
    private Integer countCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="eid")
    private ExamItem utToExam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private Users utToUsers;

}
