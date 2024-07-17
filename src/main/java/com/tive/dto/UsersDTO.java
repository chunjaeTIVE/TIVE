package com.tive.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDTO {
    private String uid;

    @NotEmpty(message = "입력해")
    private String name;

    @NotEmpty(message = "입력해")
    @Pattern(regexp = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", message = "올바른 이메일 형식으로 입력하세요.")
    private String email;

    @NotEmpty(message = "입력해")
    private String pwd;

    private String schoolLevel;

    private int agree;

    @NotEmpty(message = "입력해")
    @Pattern(regexp = "(01[016789])(\\d{3,4})(\\d{4})", message = "올바른 형식으로 입력하세요.")
    private String phone;

    @Builder.Default // 기본값을 USER로 설정
    private String role = "USER";

}
