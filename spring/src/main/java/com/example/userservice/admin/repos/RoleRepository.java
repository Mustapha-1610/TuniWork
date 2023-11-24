// RoleRepository
package com.example.userservice.admin.repos;

import com.example.userservice.admin.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findByName(String name);

    boolean existsByName(String name);
}
