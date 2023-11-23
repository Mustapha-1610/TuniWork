package com.example.userservice.company.repo;

import com.example.userservice.company.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CompanyRepository extends MongoRepository<Company, String> {
    List<Company> findByAccountActivationStatus(boolean accountActivationStatus);

    List<Company> findByAccountVerificationStatus(boolean accountVerificationStatus);
}

