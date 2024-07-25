package com.tive.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user_answer")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ua_id")
    private Long uaId;
    @Column(name="user_answer",columnDefinition = "longtext")
    private String userAns;
    @Column(nullable = false)
    private Integer correct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private Users uaToUsers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="qid")
    private QuestionItem uaToQuestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ut_id")
    private UserTest uaToUt;
}
