package com.example.userservice.admin.config;


import com.example.userservice.admin.flilter.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static jakarta.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static org.springframework.security.config.Customizer.withDefaults;


@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthorizationFilter jwtAuthFilter; // this is the filter that will be used to authenticate requests
    private final AuthenticationProvider authenticationProvider; // this is the provider that will be used to authenticate requests
    private final LogoutHandler logoutHandler; // this is the handler that will be used to log out users


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // disable CSRF protection
                .csrf(
                        AbstractHttpConfigurer::disable
                )

                // set up the headers to use the same origin
                .headers(
                        headers -> headers
                                .frameOptions().sameOrigin()
                )

                // set up the Exception Handler
                .exceptionHandling(
                        exceptionHandling -> exceptionHandling
                                .accessDeniedHandler((request, response, accessDeniedException) -> {
                                    response.setStatus(SC_FORBIDDEN);
                                    response.getWriter().write("access denied");
                                    log.error("Access denied error handler triggered");
                                })
                )

                // set up the authorization rules
                .authorizeHttpRequests(
                        authorizeHttpRequests -> authorizeHttpRequests

                                // allow access to the static resources to everyone
                                .requestMatchers(HttpMethod.POST,
                                        "/api/v1/auth/register/**",
                                        "/api/v1/auth/refresh-token",
                                        "/api/v1/auth/enable-user/**",
                                        "/api/v1/auth/authenticate","http://localhost:4200/api/v1/auth/authenticate")
                                .permitAll()

                                // allow only authenticated user to this endpoint
                                .requestMatchers(HttpMethod.GET,
                                        "/api/v1/admin/**")
                                .hasAuthority("ROLE_ADMIN")

                                // any other request must be authenticated
                                .anyRequest().authenticated()
                )


                // set up the CORS configuration
                .cors(withDefaults()) // by default uses a Bean by the name of corsConfigurationSource



                // set up the authentication provider
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // set up the logout handler
                .logout(
                        logout -> logout
                                .logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(SC_FORBIDDEN);
                    // Log the actual error message
                    log.error("Access denied error:", accessDeniedException);
                    response.getWriter().write("Access denied: " + accessDeniedException.getMessage());
                })
        );

        return http.build();
    }


    @Bean(name = "corsConfigurationSource")
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Expose-Headers"));
        corsConfiguration.setAllowCredentials(true);

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}