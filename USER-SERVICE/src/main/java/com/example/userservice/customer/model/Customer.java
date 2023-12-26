package com.example.userservice.customer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "customers")
public class Customer {

    @Id
    private String id;

    @Field("Name")
    private String name;

    @Field("LastName")
    private String lastName;

    @Field("PhoneNumber")
    private String phoneNumber;

    @Field("ProfilePicture")
    private String profilePicture;

    @Field("Email")
    private String email;

    @Field("Password")
    private String password;

    @Field("Reviews")
    private int reviews;

    @Field("PaymentMethodVerificationStatus")
    private boolean paymentMethodVerificationStatus;

    @Field("WorkOffered")
    private int workOffered;

    @Field("MoneySpent")
    private int moneySpent;

    @Field("JoinDate")
    private LocalDate joinDate;

    @Field("VerificationCode")
    private String verificationCode;

    @Field("AccountActivationStatus")
    private boolean accountActivationStatus;

    @Field("AccountVerificationStatus")
    private boolean accountVerificationStatus;

    @Field("EstimateWorkLocation")
    private EstimateWorkLocation estimateWorkLocation;

    @Field("Location")
    private String location;

    @Field("SavedFreelancers")
    private List<SavedFreelancer> savedFreelancers;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EstimateWorkLocation {

        @Field("City")
        private String city;

        @Field("Municipality")
        private String municipality;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SavedFreelancer {

        @Field("FreelancerId")
        private String freelancerId;

        @Field("FreelancerName")
        private String freelancerName;

    }
}
