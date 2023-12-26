package com.example.userservice.admin.service;


import com.example.userservice.admin.repos.AdminRepository;
import com.example.userservice.company.model.Company;
import com.example.userservice.company.repo.CompanyRepository;
import com.example.userservice.customer.model.Customer;
import com.example.userservice.customer.repo.CustomerRepository;
import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminService  {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private FreelancerRepository freelancerRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CustomerRepository customerRepository;




    //get freelancers by id
    public Freelancer getFreelancerById(String id) {
        return freelancerRepository.findById(id).orElse(null);
    }



    //get company by id
    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElse(null);
    }

    //get customer by id
    public Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElse(null);
    }


    //get all disabled companies
    public List<Company> disabledCompanies() {
        return companyRepository.findByAccountActivationStatus(false);
    }

    //get all disabled freelancers

    public List<Freelancer> disabledFreelancers() {
        return freelancerRepository.findByAccountActivationStatus(false);
    }

    //get all disabled customers

    public List<Customer> disabledCustomers() {
        return customerRepository.findByAccountActivationStatus(false);
    }



    //get unverified freelancers
    public List<Freelancer> getUnverifiedFreelancers() {
        return freelancerRepository.findByAccountVerificationStatus(false);
    }


    //get unverified companies
    public List<Company> getUnverifiedCompanies() {
        return companyRepository.findByAccountVerificationStatus(false);
    }

    //get unverified customers
    public List<Customer> getUnverifiedCustomers() {
        return customerRepository.findByAccountVerificationStatus(false);
    }



    //get active companies

    public List<Company> activeCompanies(){

        return  companyRepository.findByAccountActivationStatus(true);
    }

    //get verified companies
    public List<Company> verifiedCompanies(){

        return  companyRepository.findByAccountVerificationStatus(true);
    }


    //get active freelancers
    public List<Freelancer> activeFreelancers(){

        return  freelancerRepository.findByAccountActivationStatus(true);
    }

    //get active customers
    public List<Customer> activeCustomers(){

        return  customerRepository.findByAccountActivationStatus(true);
    }













}
