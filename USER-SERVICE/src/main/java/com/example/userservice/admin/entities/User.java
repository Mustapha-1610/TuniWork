package com.example.userservice.admin.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "user_app",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @SequenceGenerator(
            name = "user_generator",
            sequenceName = "user_app_seq",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
    @Column(name = "id")
    private Long id;

    @Column(length = 30)
    private String firstName;

    @Column(length = 30)
    private String lastName;

    @Column(length = 100)
    private String email;

    private String password;

    @Transient
    private String confirmPassword;

    @Enumerated(EnumType.STRING)
    private Role role;

    /**
     * the user by default is not enable, until he activates his account.
     */
    @Column(name = "enabled")
    private boolean enabled; // by default is false, until the user activates his account via email verification.

    private boolean accountNonLocked; // by default is true, until the user is blocked by the admin.

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    public static User of(String firstName, String lastName, String email, String password, String confirmPassword, Role role) {
        return new User(null, firstName, lastName, email, password, confirmPassword, role, false, true, null);
    }

}
