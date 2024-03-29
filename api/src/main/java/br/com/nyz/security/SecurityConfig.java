package br.com.nyz.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()

                .and()
                .authorizeRequests()
                .antMatchers("/*/**/public").permitAll()
                .antMatchers("*").permitAll()
                .antMatchers(POST, "/api/user/register").permitAll()
                .antMatchers(POST, "/api/user/login").permitAll()
                .antMatchers(GET, "/api/user").permitAll()
                .antMatchers(GET, "/api/user/users").permitAll()
                .antMatchers(GET, "/api/user/users/**").permitAll()
                .antMatchers(GET, "/api/post").permitAll()
                .antMatchers(GET, "/api/post/**").permitAll()
                .antMatchers(POST, "/api/post/add").permitAll()
                .antMatchers(GET, "/api/post/myposts/**").permitAll()
                .antMatchers(POST, "/api/connections").permitAll()
                .antMatchers(DELETE, "/api/connections").permitAll()
                .antMatchers(POST, "/api/connections/**").permitAll()
                .antMatchers(DELETE, "/api/connections/**").permitAll()
                .antMatchers(DELETE, "/api/post/remove/**").permitAll()
                .and()
                .authorizeRequests()
                .anyRequest().authenticated()

                .and()
                .httpBasic()
                .authenticationEntryPoint((request, response, authException) -> response.setStatus(UNAUTHORIZED.value()))

                .and()
                .logout()
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(OK.value()))
        ;

        return http.build();

    }
}
