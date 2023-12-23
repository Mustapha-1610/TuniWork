package com.example.userservice.admin.Exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PasswordDontMatchException extends ResponseStatusException {
    public PasswordDontMatchException() {
        super(HttpStatus.BAD_REQUEST, "passwords don't match");
    }
}
