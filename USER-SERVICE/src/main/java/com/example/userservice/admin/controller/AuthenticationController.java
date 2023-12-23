package com.example.userservice.admin.controller;


import com.example.userservice.admin.Exeption.PasswordDontMatchException;
import com.example.userservice.admin.Exeption.UserNotFoundException;
import com.example.userservice.admin.requests.AuthenticationRequest;
import com.example.userservice.admin.requests.AuthenticationResponse;

import com.example.userservice.admin.service.AuthenticationService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse responseToken = authenticationService.authenticate(request);
        return ResponseEntity.ok(responseToken);
    }


    @PostMapping("refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        AuthenticationResponse responseToken = authenticationService.refreshToken(request, response);
        return ResponseEntity.ok(responseToken);
    }



}
