package com.example.userservice.admin.service;

import com.example.userservice.admin.entities.Admin;
import com.example.userservice.admin.repos.AdminRepository;
import com.example.userservice.company.model.Company;
import com.example.userservice.company.repo.CompanyRepository;
import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AdminService  {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private FreelancerRepository freelancerRepository;
    @Autowired
    private CompanyRepository companyRepository;

    // Your existing functions...

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Freelancer getFreelancerById(String id) {
        return freelancerRepository.findById(id).orElse(null);
    }

    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElse(null);
    }


}
