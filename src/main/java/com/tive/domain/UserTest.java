package com.tive.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="user_test")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
public class UserTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ut_id")
    private Long utId;
    @CreatedDate
    @Column(name="exam_date",nullable = false)
    private LocalDateTime examDate;
    @Column(name="count_correct")
    private Integer countCorrect;

    @Column(name = "local_code")
    private Integer localCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="eid")
    private ExamItem utToExam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private Users utToUsers;

}
