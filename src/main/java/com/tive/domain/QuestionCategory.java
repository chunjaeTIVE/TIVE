package com.tive.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="question_category")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionCategory {

    @Id
    @Column(name="category_code")
    private String categoryCode;

    @Column(name="category_name")
    private String categoryName;

    @Column(name="subject_id")
    private Long subjectId;

    @Column(name="category_type")
    private String categoryType;

    @Column(name="school_level")
    private String schoolLevel;


}
