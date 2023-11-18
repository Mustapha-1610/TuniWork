package com.example.userservice.freelancer.repo;

import com.example.userservice.freelancer.model.Freelancer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface FreelancerRepository extends MongoRepository<Freelancer,String> {
}
