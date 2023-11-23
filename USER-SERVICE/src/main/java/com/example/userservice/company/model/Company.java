package com.example.userservice.company.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "companies")
public class Company {

    @Id
    private String id;

    @Field("CompanyName")
    private String companyName;

    @Field("CompanyEmail")
    private String companyEmail;

    @Field("Password")
    private String password;

    @Field("CompanyWebsite")
    private String companyWebsite;

    @Field("CompanyLogo")
    private String companyLogo;

    @Field("CompanyDescription")
    private String companyDescription;

    @Field("CompanyPhone")
    private int companyPhone;

    @Field("Location")
    private String location;

    @Field("VerificationCode")
    private String verificationCode;

    @Field("AccountActivationStatus")
    private boolean accountActivationStatus = true;

    @Field("AccountVerificationStatus")
    private boolean accountVerificationStatus = false;

    @Field("JoinDate")
    private Date joinDate = new Date();

    @Field("Reviews")
    private int reviews = 0;

    @Field("PaymentMethodVerificationStatus")
    private boolean paymentMethodVerificationStatus = false;

    @Field("WorkOffered")
    private int workOffered = 0;

    @Field("MoneySpent")
    private int moneySpent = 0;

    @Field("savedFreelancers")
    private List<SavedFreelancer> savedFreelancers;

    // constructors, getters, and setters

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SavedFreelancer {
        @Field("freelancerId")
        private String freelancerId;

        @Field("freelancerName")
        private String freelancerName;


    }
}