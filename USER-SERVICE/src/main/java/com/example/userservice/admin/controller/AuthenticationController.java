package com.example.userservice.admin.controller;

import com.example.userservice.admin.dto.LoginResponse;
import com.example.userservice.admin.dto.LoginUserDto;
import com.example.userservice.admin.dto.RegisterUserDto;
import com.example.userservice.admin.dto.SignUpRequest;
import com.example.userservice.admin.service.AuthenticationService;
import com.example.userservice.admin.service.JwtService;
import com.example.userservice.admin.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }



}