package com.example.userservice;

import com.example.userservice.admin.entities.Admin;
import com.example.userservice.admin.entities.AdminPermissions;
import com.example.userservice.admin.entities.Role;
import com.example.userservice.admin.repos.AdminRepository;
import com.example.userservice.admin.repos.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@SpringBootApplication
public class UserServiceApplication {

    @Autowired
    private RoleRepository roleRepository; // Inject the RoleRepository

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }



    @Bean
    public CommandLineRunner initializeAdmin(AdminRepository adminRepository) {
        return args -> {
            initializeAdmin(adminRepository, "admin", "admin123", "ROLE_SUPER_ADMIN");
        };
    }




    private void initializeAdmin(AdminRepository adminRepository, String username, String password, String roleName) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(username);
        if (existingAdmin.isEmpty()) {
            List<Role> roles = roleRepository.findByName(roleName);
            if (!roles.isEmpty()) {
                Admin admin = new Admin();
                admin.setUsername(username);
                admin.setPassword(password);
                admin.setRole(roles.get(0)); // Assuming there's only one role with the given name
                adminRepository.save(admin);
            }
        }
    }
}
