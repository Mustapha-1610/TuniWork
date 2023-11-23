package com.example.userservice.admin.repos;

import com.example.userservice.admin.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;



@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);



}
