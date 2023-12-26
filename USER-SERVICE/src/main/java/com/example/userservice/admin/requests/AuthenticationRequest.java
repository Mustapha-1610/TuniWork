package com.example.userservice.admin.requests;

public record AuthenticationRequest(
        String email,

        String password
) {

}
