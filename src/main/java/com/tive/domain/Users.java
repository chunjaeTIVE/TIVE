package com.tive.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String pwd;
    @Enumerated(EnumType.STRING)
    @Column(name="school_level",nullable = false)
    private SchoolLV schoolLevel;
    @Column(nullable = false)
    private Integer agree;
    @Column(nullable = false)
    private String phone;
    @Column(name = "local_code")
    private Integer localCode;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    @Column(name = "local_name")
    private String localName;
}
