package com.tive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring()
                .requestMatchers("/resources/**")
                .requestMatchers("/css/**")
                .requestMatchers("/js/**")
                .requestMatchers("/img/**")
                .requestMatchers("/font/**")
//                .requestMatchers("/emailCheck")//이메일 중복체크
                ;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
/*        http.csrf (crsf-> crsf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringRequestMatchers("/emailCheck"));*/
        //이게 대체 뭔말? 암튼 csrf에서 익셉션 생기니까 던져주자~
        http.csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

        http.authorizeHttpRequests(authorize -> //롤에 따라 접근가능한 페이지 분류
                authorize
                        .requestMatchers("/index/**", "/cbtTest/**", "/join", "/login", "/exam1/13", "/exam1/24","/api/**", "/emailCheck").permitAll()
                        .requestMatchers("/testgogo/**", "/playTest/**", "/warnInfo/**", "/exam1/**"
                                ,"/report_basic", "/report_detail","/report_alert","/reportdetaillist/**","/subjectivelist/**"
                                ,"/levelrate/**","/contentrate/**","/resprate/**","/report_question/**", "/ranking","/schools","/check/**"
                                ,"/users/agree","/submit_exam").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                );

        http.formLogin(formLogin -> formLogin
                .loginPage("/login")//로그인으로 가서
                .loginProcessingUrl("/login")// 이거 뭐지
                .defaultSuccessUrl("/index")//로그인 성공했으면 인덱스로 가자
                .usernameParameter("email")
                .passwordParameter("pwd")
                .failureHandler(authenticationFailureHandler())
                .permitAll());

        http.logout(logout-> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID"));

        http.exceptionHandling(exceptionConfig ->
                exceptionConfig.accessDeniedHandler(
                        new CustomAccessDeniedHandler("/error/403")
                ));

        return http.build();

    }

    @Bean //로그인 실패시 알림창
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            response.sendRedirect("/login?error=true");
        };
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder(){//비밀번호 암호화
        return new BCryptPasswordEncoder();
    }

}
