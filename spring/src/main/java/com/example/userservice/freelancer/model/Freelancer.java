package com.example.userservice.freelancer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Entity;
import java.util.Date;
import java.util.List;



@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "freelancers")
public class Freelancer {

    @Id
    private String id;

    @Field("PhoneNumber")
    private Long phoneNumber;

    @Field("ProfilePicture")
    private String profilePicture;

    @Field("Email")
    private String email;

    @Field("Password")
    private String password;

    @Field("VerificationCode")
    private String verificationCode;

    @Field("AccountActivationStatus")
    private Boolean accountActivationStatus;

    @Field("AccountVerficiationStatus")
    private Boolean accountVerificationStatus;

    @Field("Earnings")
    private Double earnings;

    @Field("PayRate")
    private PayRate payRate;

    @Field("WorkHistory")
    private List<WorkHistory> workHistory;

    @Field("Schedule")
    private Schedule schedule;

    @Field("Messages")
    private List<String> messages;

    @Field("Languages")
    private List<String> languages;

    @Field("EstimateWorkLocation")
    private String estimateWorkLocation;

    @Field("WorkTitle")
    private WorkTitle workTitle;

    @Field("Speciality")
    private List<String> speciality;

    @Field("VerLinkExpDate")
    private Date verLinkExpDate;

    @Field("ProposedPrivateWorks")
    private List<ProposedPrivateWork> proposedPrivateWorks;

    // Constructors, getters, and setters

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PayRate {
        @Field("HourlyRate")
        private Double hourlyRate;

        @Field("PayPerTaskRate")
        private Double payPerTaskRate;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkHistory {
        @Field("Ongoing")
        private List<OngoingTask> ongoing;

        @Field("Finiched")
        private List<FinishedTask> finished;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OngoingTask {
        @Field("TaskTitle")
        private String taskTitle;

        @Field("TaskHolder")
        private String taskHolder; // Assuming this is a string representation of ObjectId

        @Field("DueDate")
        private Date dueDate;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FinishedTask {
        @Field("TaskTitle")
        private String taskTitle;

        @Field("TaskHolder")
        private String taskHolder; // Assuming this is a string representation of ObjectId

        @Field("EarningsMade")
        private Double earningsMade;

        @Field("Review")
        private String review;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Schedule {
        @Field("Weekly")
        private List<Date> weekly;

        @Field("Monthly")
        private List<Date> monthly;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkTitle {
        @Field("WorkTitleId")
        private String workTitleId; // Assuming this is a string representation of ObjectId

        @Field("WorkTitleText")
        private String workTitleText;

        // Constructors, getters, and setters
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProposedPrivateWork {
        @Field("PrivateJobOfferId")
        private String privateJobOfferId; // Assuming this is a string representation of ObjectId

        @Field("Status")
        private String status;

        // Constructors, getters, and setters
    }
}
