package com.example.userservice.customer.repo;

import com.example.userservice.customer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public  interface CustomerRepository extends MongoRepository<Customer , String> {


    List<Customer> findByAccountActivationStatus(boolean accountActivationStatus);

    List<Customer> findByAccountVerificationStatus(boolean accountVerificationStatus);
}
