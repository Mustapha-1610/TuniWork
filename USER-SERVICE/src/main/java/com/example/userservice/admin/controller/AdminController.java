package com.example.userservice.admin.controller;


import com.example.userservice.admin.entities.User;
import com.example.userservice.admin.repos.AdminRepository;
import com.example.userservice.admin.service.AdminService;
import com.example.userservice.company.model.Company;
import com.example.userservice.company.repo.CompanyRepository;
import com.example.userservice.customer.model.Customer;
import com.example.userservice.customer.repo.CustomerRepository;
import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private final FreelancerRepository freelancerRepository;
    private final CompanyRepository companyRepository;
    private final AdminRepository adminRepository;

    private final CustomerRepository customerRepository;
    private final AdminService adminService;
    private final JavaMailSender javaMailSender;

    @Autowired
    public AdminController(FreelancerRepository freelancerRepository, CompanyRepository companyRepository, AdminRepository adminRepository, AdminService adminService,CustomerRepository customerRepository, JavaMailSender javaMailSender) {
        this.freelancerRepository = freelancerRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
        this.adminService = adminService;
        this.customerRepository = customerRepository;
        this.javaMailSender = javaMailSender;

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

    @PostMapping("/freelancers/disable/{id}")
    public ResponseEntity<String> disableFreelancer(@PathVariable String id) {
        Freelancer freelancer = adminService.getFreelancerById(id);

        // check if freelancer exists in db
        if (freelancer == null) {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }

        // check if freelancer is already disabled
        if (freelancer.getAccountActivationStatus()==false) {
            return ResponseEntity.badRequest().body("Freelancer already disabled");  // 400 Bad Request
        }

        freelancer.setAccountActivationStatus(false);
        sendDisableEmail(freelancer.getEmail());
        freelancerRepository.save(freelancer);

        return ResponseEntity.ok("Freelancer has been disabled");  // 200 OK
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
            sendEnableEmail(freelancer.getEmail());

            freelancerRepository.save(freelancer);

            return "freelancer has been enabled";
        }


    }

    /*

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
            sendApprovedVerifMail(freelancer.getEmail());

            freelancerRepository.save(freelancer);


            return "freelancer has been verified";

        }

    }


     */

    /*


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

            freelancerRepository.save(freelancer);

            return "freelancer verification has been denied";
        }

    }

     */



    /// retrieve all disabled freelancers

    @GetMapping("freelancers/getDisabledFreelancers")
    public List<Freelancer> getDisabledFreelancers() {
        return adminService.disabledFreelancers();
    }




    ///retrieve all active freelancers

    @GetMapping("freelancers/activeFreelancers")
    public List<Freelancer> getActiveFreelancers() {

        return adminService.activeFreelancers();
    }

    ///retrieve all verification requests
    @GetMapping("freelancers/getVerficationRequests")
    public List<Freelancer> getFreelancersVerfiRequests() {
        return adminService.getUnverifiedFreelancers();
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

    ///get all verified companies
    @GetMapping("companies/verifiedCompanies")
    public List<Company> getVerifiedCompanies()
    {
        return adminService.verifiedCompanies();
    }



    //////Disable a company account
    @PostMapping("/companies/disable/{id}")
    public String disableComapnyAccount(@PathVariable String id) {

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
            sendDisableEmail(company.getCompanyEmail());

            companyRepository.save(company);

            return "Company Disabled";
        }

    }

    //////Enable a company account
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
            sendEnableEmail(company.getCompanyEmail());
            companyRepository.save(company);

            return "Company Enabled";
        }
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
            sendApprovedVerifMail(company.getCompanyEmail());
            companyRepository.save(company);

            return "Company verified";
        }

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

            companyRepository.save(company);

            return "Verification denied";
        }

    }

    // retrieve all disabled companies

    @GetMapping("companies/disabledCompanies")
    public List<Company> getDisabledCompanies() {
        return adminService.disabledCompanies();
    }



    //retrieve all active companies
    @GetMapping("companies/activeCompanies")
    public List<Company> getActiveCompanies() {

        return adminService.activeCompanies();
    }

    // retrieve all Companies verification requests

    @GetMapping("companies/verificationRequests")
    public List<Company> getCompanyVerificationRequests() {
        return adminService.getUnverifiedCompanies();
    }




    /////////////CUSTOMER SECTION/////////////////

    ///////////retrieve all Cusomers
    @GetMapping("customers/getall")
    public List<Customer> getAllCustomers() {
        System.out.println("Fetching all customers...");
        List<Customer> customers = customerRepository.findAll();
        System.out.println("Number of customers retrieved: " + customers.size());
        return customers;
    }

    /////retrieve customer profile
    @GetMapping("customers/getcustomer/{id}")
    public Customer getcustomer(@PathVariable String id) {

        return adminService.getCustomerById(id);
    }


    @PostMapping("/customers/disable/{id}")
    public ResponseEntity<String> disableCustomerAccount(@PathVariable String id) {
        Customer customer = adminService.getCustomerById(id);

        // check if customer exists in db
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        } else if (!customer.isAccountActivationStatus()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer already disabled");
        } else {
            customer.setAccountActivationStatus(false);
            sendDisableEmail(customer.getEmail());
            customerRepository.save(customer);
            return ResponseEntity.ok("Customer disabled");
        }
    }


    //////Enable a customer account
    @PostMapping("/customers/enable/{id}")
    public String enableCustomerAccount(@PathVariable String id) {

        Customer customer = adminService.getCustomerById(id);

        // check if customer exists in db
        if (customer == null) {
            return "Costomer doesn't exist";
        }
        //check if customer already Enabled
        else if( customer.isAccountActivationStatus()==true){
            return "Customer already Enabled";

        }
        else {
            customer.setAccountActivationStatus(true);
            sendEnableEmail(customer.getEmail());

            customerRepository.save(customer);

            return "customer Enabled";
        }

    }

    // retrieve all disabled customers

    @GetMapping("customers/disabledCustomers")
    public List<Customer> getDisabledCustomers() {
        return adminService.disabledCustomers();
    }


    //retrieve all active customers
    @GetMapping("customers/activeCustomers")
    public List<Customer> getActiveCustomers() {

        return adminService.activeCustomers();
    }


    /*


    ////approve verification request for the customers
    @PostMapping("customers/verification/{id}")
    public String verifCustomer(@PathVariable String id){

        Customer customer = adminService.getCustomerById(id);

        // check if customer exists in db
        if (customer == null) {
            return "Customer doesn't exist";
        }
        //check if customer already verified
        else if( customer.getAccountVerificationStatus()==true){
            return "Customer already Verified";

        }
        else {
            customer.setAccountVerificationStatus(true);
            sendApprovedVerifMail(customer.getEmail());


            customerRepository.save(customer);

            return "verification approved";
        }

    }

     */

    /*

    ////deny verification request for the customer


    @PostMapping("customer/denyverification/{id}")
    public String denyverifCustomer(@PathVariable String id){

        Customer customer = adminService.getCustomerById(id);

        // check if customer exists in db
        if (customer == null) {
            return "customer doesn't exist";
        }
        //check if customer already not verifyed
        else if( customer.getAccountActivationStatus()== false){
            return "Customer already not verifyed";

        }
        else {
            customer.setAccountVerificationStatus(false);

            customerRepository.save(customer);

            return "verification denied";
        }

    }


    // retrieve all Customers verification requests

    @GetMapping("customers/verificationRequests")
    public List<Customer> getCustomerVerificationRequests() {
        return adminService.getUnverifiedCustomers();
    }


     */








    ////////////////ADMIN SECTION//////////////////

    //////retrieve all admins
    @GetMapping("GetAllAdmins")
    public List<User> getAllAdmins() {
        return adminRepository.findAll();
    }



    /////////// EMAIL HANDLING

    // send disable mail when disabling a user
    private void sendDisableEmail(String userEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Account Disabled");
        message.setText("Your account has been disabled for security reasons.");
        javaMailSender.send(message);
    }

    //send enable mail when enabling a user

    private void sendEnableEmail(String userEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Account Enabled");
        message.setText("Your account has been Enabled successfully");
        javaMailSender.send(message);
    }


    //send mail when approving verification
    private void sendApprovedVerifMail(String userEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Account has been verified");
        message.setText("Your account has been verified successfully");
        javaMailSender.send(message);
    }

    @GetMapping("/admin")
    public ResponseEntity<String> adminGreeting() {
        return ResponseEntity.ok("Hello admin u are reading this message from a protected endpoint. Only admins can access this endpoint.");
    }
}
