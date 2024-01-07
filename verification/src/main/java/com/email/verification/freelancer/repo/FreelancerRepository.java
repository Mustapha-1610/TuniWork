package com.email.verification.freelancer.repo;

import com.email.verification.freelancer.model.Freelancer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface FreelancerRepository extends MongoRepository<Freelancer,String> {
    List<Freelancer> findByAccountActivationStatus(boolean accountActivationStatus);
    List<Freelancer> findByAccountVerificationStatus(boolean accountVerificationStatus);
}
