package com.example.userservice.admin.service;


import com.example.userservice.admin.Exeption.PasswordDontMatchException;
import com.example.userservice.admin.Exeption.UserNotFoundException;
import com.example.userservice.admin.entities.User;
import com.example.userservice.admin.entities.UserDetailsImpl;
import com.example.userservice.admin.repos.AdminRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final AdminRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loading user by username: {}", username);
        User user = userRepository
                .findByEmail(username) // find the user by email
                .orElseThrow(() -> new UsernameNotFoundException("user not found")); // if the user is not found, throw an exception
        return new UserDetailsImpl(user);
    }


    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }



    public User findUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("no user with email: " + email + " found"));
    }


    public User saveUser(User user) {
        String email = user.getEmail(); // get the email that the user have provided

        // check if the email already exists
        if (emailExists(email)) {
            // if the email already exists, throw an exception
        } else { // if the email doesn't exist, save the user

            String password = user.getPassword(); // get the password that the user have provided
            user.setPassword(passwordEncoder.encode(password)); // encode the password


            userRepository.save(user); // save the user
        }
        return user;
    }


    public void updatePassword(String email, String password, String confirmPassword) {

        if (emailExists(email)) { // check if the email exists
            User user = findUserByEmail(email); // get the user

            if (password.equals(confirmPassword)) { // check if the password and the confirmPassword matches.
                user.setPassword(passwordEncoder.encode(confirmPassword)); // encode the new password
                userRepository.save(user); // save the user
            } else { // if the password doesn't match, throw an exception
                throw new PasswordDontMatchException();
            }
        } else { // if the email doesn't exist, throw an exception
            throw new UserNotFoundException("no user with email: " + email + " found");
        }
    }


    public User validateCredentials(String email, String password) {

        User user = userRepository
                .findByEmail(email) // get the user by email
                .orElseThrow(
                        // if the user doesn't exist, throw an exception
                        () -> new BadCredentialsException("Invalid credentials")
                );

        // check if the password matches
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("Invalid credentials");

        return user;
    }



    public void enableUser(String email) {
        // get the user by email
        User user = findUserByEmail(email);
        // enable the user
        user.setEnabled(true);
        // save the user
        userRepository.save(user);
    }

}