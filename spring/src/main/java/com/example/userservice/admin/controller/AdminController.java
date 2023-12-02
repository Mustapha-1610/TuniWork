package com.example.userservice.admin.controller;





import com.example.userservice.admin.entities.Admin;
import com.example.userservice.admin.repos.AdminRepository;
import com.example.userservice.admin.service.AdminService;
import com.example.userservice.company.model.Company;
import com.example.userservice.company.repo.CompanyRepository;
import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private FreelancerRepository freelancerRepository;
    private CompanyRepository companyRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminService adminService;

    public AdminController(FreelancerRepository freelancerRepository, CompanyRepository companyRepository, AdminRepository adminRepository, AdminService adminService) {
        this.freelancerRepository = freelancerRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
        this.adminService = adminService;
    }

    ///////////FREELANCER SECTION///////////////////

    /////////////retrieve all freelancers
    @GetMapping("freelancers/getall")
    public List<Freelancer> getAllFreelancers() {
        return freelancerRepository.findAll();
    }

    /////retrieve Freelancer profile
    @GetMapping("freelancer/getFreelancer/{id}")
    public Freelancer getFreelancer(@PathVariable String id) {

        return adminService.getFreelancerById(id);
    }

    //////Disable a freelancer account
    @PostMapping("/freelancers/disable/{id}")
    public String disableFreelancer(@PathVariable String id) {

        Freelancer freelancer = adminService.getFreelancerById(id);

        // check if freelancer exists in db
        if (freelancer == null) {
            return "Freelancer doesn't exist";
        }
        //check if freelancer aready disabled
        else if( freelancer.getAccountActivationStatus()==false){
            return "Freelancer already disabled";

        }
        else {
            freelancer.setAccountActivationStatus(false);
        }

        freelancerRepository.save(freelancer);

        return "redirect:/admin/freelancers";
    }


    //////Enable a freelancer account
    @PostMapping("/freelancers/Enable/{id}")
    public String enableFreelancer(@PathVariable String id) {

        Freelancer freelancer = adminService.getFreelancerById(id);

        // check if freelancer exists in db
        if (freelancer == null) {
            return "Freelancer doesn't exist";
        }
        //check if freelancer aready disabled
        else if( freelancer.getAccountActivationStatus()==true){
            return "Freelancer already Enabled";

        }
        else {
            freelancer.setAccountActivationStatus(true);
        }

        freelancerRepository.save(freelancer);

        return "redirect:freelancer/getFreelancer/{id}";
    }

    ////approve verification request for the freelancers


    @PostMapping("freelancers/verification/{id}")
    public String verifFreelancer(@PathVariable String id){

        Freelancer freelancer = adminService.getFreelancerById(id);

        // check if Freelancer exists in db
        if (freelancer == null) {
            return "freelancer doesn't exist";
        }
        //check if freelancer already exists
        else if( freelancer.getAccountVerificationStatus()){
            return "freelancer already Verified";

        }
        else {
            freelancer.setAccountVerificationStatus(true);
        }
        freelancerRepository.save(freelancer);

        return "redirect:/admin/freelancer/{id}";
    }


    ////deny verification request for the freelancers


    @PostMapping("freelancers/denyverification/{id}")
    public String denyverifFreelancer(@PathVariable String id){

        Freelancer freelancer = adminService.getFreelancerById(id);

        // check if Frellancer exists in db
        if (freelancer == null) {
            return "freelancer doesn't exist";
        }
        //check if freelancer already not verifyed
        else if( freelancer.getAccountVerificationStatus()== false){
            return "freelancer already not verifyed";

        }
        else {
            freelancer.setAccountVerificationStatus(false);
        }
        freelancerRepository.save(freelancer);

        return "redirect:/admin/freelancer/{id}";
    }


    //////////////COMPANY SECTION//////////////////

    ///////////retrieve all Companies
    @GetMapping("companies/getall")
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /////retrieve company profile
    @GetMapping("companies/getcompany/{id}")
    public Company getcompany(@PathVariable String id) {

        return adminService.getCompanyById(id);
    }


    //////Disable a company account
    @PostMapping("/companies/disable/{id}")
    public String disableCompanyAccount(@PathVariable String id) {

        Company company = adminService.getCompanyById(id);

        // check if company exists in db
        if (company == null) {
            return "Company doesn't exist";
        }
        //check if company aready disabled
        else if( company.isAccountActivationStatus()==false){
            return "Company already Enabled";

        }
        else {
            company.setAccountActivationStatus(false);
        }
        companyRepository.save(company);

        return "redirect:/admin/companies";
    }

    //////Disable a company account
    @PostMapping("/companies/enable/{id}")
    public String enableCompanyAccount(@PathVariable String id) {

        Company company = adminService.getCompanyById(id);

        // check if company exists in db
        if (company == null) {
            return "Company doesn't exist";
        }
        //check if company already exists
        else if( company.isAccountActivationStatus()){
            return "Company already Enabled";

            }
         else {
            company.setAccountActivationStatus(true);
        }
        companyRepository.save(company);

        return "redirect:/admin/companies";
    }


    ////approve verification request for the companies


    @PostMapping("companies/verification/{id}")
    public String verifCompany(@PathVariable String id){

        Company company = adminService.getCompanyById(id);

        // check if company exists in db
        if (company == null) {
            return "Company doesn't exist";
        }
        //check if company already exists
        else if( company.isAccountVerificationStatus()){
            return "Company already Verified";

        }
        else {
            company.setAccountVerificationStatus(true);
        }
        companyRepository.save(company);

        return "redirect:/admin/company/{id}";
    }

    ////deny verification request for the company


    @PostMapping("company/denyverification/{id}")
    public String denyverifCompany(@PathVariable String id){

        Company company = adminService.getCompanyById(id);

        // check if company exists in db
        if (company == null) {
            return "company doesn't exist";
        }
        //check if company already not verifyed
        else if( company.isAccountVerificationStatus()== false){
            return "Company already not verifyed";

        }
        else {
            company.setAccountVerificationStatus(false);
        }
        companyRepository.save(company);

        return "redirect:/admin/company/{id}";
    }


    ////////////////ADMIN SECTION//////////////////

    //////retrieve all admins
    @GetMapping("GetAllAdmins")
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }





}
