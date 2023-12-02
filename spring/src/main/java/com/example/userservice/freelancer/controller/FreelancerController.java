package com.example.userservice.freelancer.controller;



import com.example.userservice.freelancer.model.Freelancer;
import com.example.userservice.freelancer.repo.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FreelancerController {


    @Autowired
    private FreelancerRepository freelancerRepository;

    public FreelancerController(FreelancerRepository freelancerRepository){

        this.freelancerRepository = freelancerRepository;
    }


    @GetMapping("freelancerss/getall")

    public List<Freelancer> getAllFreelancers(){

        return freelancerRepository.findAll();
    }
}
