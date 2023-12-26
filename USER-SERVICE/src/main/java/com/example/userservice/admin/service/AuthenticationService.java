package com.example.userservice.admin.service;



import com.example.userservice.admin.entities.User;
import com.example.userservice.admin.requests.AuthenticationRequest;
import com.example.userservice.admin.requests.AuthenticationResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;


@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final TokenService tokenService;



    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            // Attempts to authenticate the user with the provided email and password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
        } catch (InternalAuthenticationServiceException e) {
            // If the authentication fails, throws an exception with a message indicating invalid credentials
            log.error("error while authenticating user with request {}", request);
            throw new BadCredentialsException("Invalid credentials");
        }

        // If the authentication is successful, retrieves the user from the database and generates a JWT token
        User user = userService.validateCredentials(request.email(), request.password());
        log.info("User {} successfully authenticated with role {}", user.getFirstName(), user.getRole());

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        tokenService.revokeAllUserTokens(user);
        tokenService.saveUserToken(user, accessToken);

        // Returns an authentication response containing the JWT token
        return new AuthenticationResponse(accessToken, refreshToken);
    }




    public void sendResetPasswordRequestToUser(String email) {
        // If an account with the given email already exists, throws an exception
        var user = userService.findUserByEmail(email);

        var jwtToken = jwtService.generateTokenForResetPassword(user.getEmail());

        // create the link for the account activation & set the token as a param
        String resetPasswordLink = "http://localhost:5173/reset-password?token=" + jwtToken;

        // Send activation link.
        try {
            log.info("Sending reset password link to user with email {}", email);
            emailService.sendResetPasswordRequestToUser(email, user.getFirstName(), resetPasswordLink);
        } catch (Exception e) {
            log.warn("Error while sending reset password link to user with email {}", email);
            log.info("If u didn't receive the email, due to the fact that we are in dev mode, we can pretend that the following link is sent : {}", resetPasswordLink);
            throw new MailSendException("Error while sending reset password link to user with email :" + email);
        }
        log.info("Reset password link sent to user with email {}", email);
    }



    public void upDatePassword(String token, String password, String passwordConfirm) {
        // retrieve the email from the token
        String email = jwtService.extractUsername(token);
        // update the password
        userService.updatePassword(email, password, passwordConfirm);
    }


    public void enableUser(String token) {
        // retrieve the email from the token
        String email = jwtService.extractUsername(token);
        // enable the user
        userService.enableUser(email);
    }



    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // initialize the result
        AuthenticationResponse result = null;

        // extract the token from the request header
        final String authHeader = request.getHeader("Authorization");

        // if the token is null or does not start with "Bearer ", return an error
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing or invalid Authorization header.");
            log.error("Missing or invalid Authorization header.");
        } else { // else, try to refresh the token
            try {
                // extract the refresh token
                log.info("Refreshing token for request {}", request.getHeader("Authorization"));
                final String refreshToken = authHeader.substring(7);

                // extract the user email from the refresh token
                var username = jwtService.extractUsername(refreshToken);
                log.info("User email is {}", username);

                // if the user email is not null, find the user in the database
                if (username != null) {
                    // find the user in the database
                    var userDetails = userService.loadUserByUsername(username);
                    log.info("User is {}", userDetails);

                    // if the user is not null and the refresh token is valid, generate a new access token
                    if (jwtService.isTokenValid(refreshToken, userDetails)) {
                        var accessToken = jwtService.generateAccessToken(userDetails.user()); // generate a new access token
                        log.info("Access token is {}", accessToken);
                        tokenService.revokeAllUserTokens(userDetails.user()); // revoke all user tokens
                        tokenService.saveUserToken(userDetails.user(), accessToken); // save the new access token


                        result = new AuthenticationResponse(accessToken, refreshToken);
                    }
                }
            } catch (ExpiredJwtException ex) { // if the refresh token is expired, return an error
                log.warn("refresh token expired: {}", ex.getMessage());
                response.sendError(SC_UNAUTHORIZED, "refresh token expired");
            } catch (MalformedJwtException e) { // if the refresh token is invalid, return an error
                log.warn("refresh token expired: {}", e.getMessage());
                response.sendError(SC_UNAUTHORIZED, "invalid refresh token.");
            }
        }

        return result;
    }
}

