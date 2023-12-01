// AdminRepository
package com.example.userservice.admin.repos;

import com.example.userservice.admin.entities.Admin;
import com.example.userservice.company.model.Company;
import com.example.userservice.freelancer.model.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);

    List<Admin> findAllByRole_Name(String roleName);

    Freelancer getFreelancerById( String id);

    Company getCompanyById(String id);



}
