package com.example.userservice.admin.service;

import com.example.userservice.admin.repos.UserRepository;
import com.example.userservice.admin.entities.User;
import com.example.userservice.company.model.Company;
import com.example.userservice.company.repo.CompanyRepository;
import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminService  {

    @Autowired
    private UserRepository adminRepository;
    @Autowired
    private FreelancerRepository freelancerRepository;
    @Autowired
    private CompanyRepository companyRepository;

    public UserDetailsService userDetailsService(){

        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return adminRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("username not found"));
            }
        };
    }

    public User save(User newUser){

        if(newUser.getId()==null){

            newUser.setCreatedAt(LocalDateTime.now());
        }
        newUser.setUpdatedAt(LocalDateTime.now());
        return adminRepository.save(newUser);
    }


    //get freelancers by id
    public Freelancer getFreelancerById(String id) {
        return freelancerRepository.findById(id).orElse(null);
    }



    //get company by id
    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElse(null);
    }


    //get all disabled companies
    public List<Company> disabledCompanies() {
        return companyRepository.findByAccountActivationStatus(false);
    }

    //get all disabled freelancers

    public List<Freelancer> disabledFreelancers() {
        return freelancerRepository.findByAccountActivationStatus(false);
    }



    //get unverified freelancers
    public List<Freelancer> getUnverifiedFreelancers() {
        return freelancerRepository.findByAccountVerificationStatus(false);
    }


    //get unverified companies
    public List<Company> getUnverifiedCompanies() {
        return companyRepository.findByAccountVerificationStatus(false);
    }



    //get active companies

    public List<Company> activeCompanies(){

        return  companyRepository.findByAccountActivationStatus(true);
    }


    //get active freelancers
    public List<Freelancer> activeFreelancers(){

        return  freelancerRepository.findByAccountActivationStatus(true);
    }












}
