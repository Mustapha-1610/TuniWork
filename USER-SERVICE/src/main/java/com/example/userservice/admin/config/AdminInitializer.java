package com.example.userservice.admin.config;

import com.example.userservice.admin.entities.User;
import com.example.userservice.admin.repos.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.example.userservice.admin.entities.Role.ROLE_ADMIN;

@Component
@Slf4j
public class AdminInitializer implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final String adminUsername;
    private final String adminPassword;
    private final PasswordEncoder passwordEncoder;


    public AdminInitializer(AdminRepository adminRepository,
                            @Value("${admin.username}") String adminUsername,
                            @Value("${admin.password}") String adminPassword, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        User admin = User.builder()
                .firstName("admin")
                .lastName("admin")
                .email(adminUsername)
                .password(adminPassword)
                .confirmPassword(adminPassword)
                .role(ROLE_ADMIN)
                .enabled(true)
                .accountNonLocked(true)
                .build();

        if (!adminRepository.existsByEmail(adminUsername)) {
            admin.setPassword(passwordEncoder.encode(adminPassword));
            adminRepository.save(admin);
            log.info("Admin user created successfully");
        } else {
            log.info("Admin user already exists");
        }
    }
}
