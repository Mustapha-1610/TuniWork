package com.example.myapplication.dataClasses

import com.google.gson.annotations.SerializedName
import java.util.Date

data class PublicJobOffer(
    @SerializedName("TaskTable") val taskTable: ArrayList<Task>,
    @SerializedName("PaymentRequest") val paymentRequest: PaymentRequest?,
    @SerializedName("Title") val title: String?,
    @SerializedName("StartTime") val startTime: Date?,
    @SerializedName("DeadLine") val deadline: Date?,
    @SerializedName("WorkTitle") val workTitle: String?,
    @SerializedName("CreationDate") val creationDate: Date?,
    @SerializedName("Description") val description: String?,
    @SerializedName("Note") val note: String?,
    @SerializedName("PaymentMethod") val paymentMethod: PaymentMethod?,
    @SerializedName("WorkSpeciality") val workSpeciality: List<String>?,
    @SerializedName("WorkingFreelancer") val workingFreelancer: WorkingFreelancer?,
    @SerializedName("CompanyName") val companyName: String?,
    @SerializedName("CompanySignature") val companySignature: String?,
    @SerializedName("Location") val location: String?,
    @SerializedName("CompanyId") val companyId: String?,
    @SerializedName("PaymentMethodVerificationStatus") val paymentMethodVerificationStatus: Boolean?,
    @SerializedName("TotalWorkOfferd") val totalWorkOfferd: Int?,
    @SerializedName("TotalMoneyPayed") val totalMoneyPayed: Double?,
    @SerializedName("status") val status: String?,
    @SerializedName("AppliedFreelancers") val appliedFreelancers: List<AppliedFreelancer>?,
    @SerializedName("_id") val idPubJob : String

) {
    data class Task(
        @SerializedName("TaskTitle") val taskTitle: String?,
        @SerializedName("TaskDoneStatus") val taskDoneStatus: Boolean?
    )

    data class PaymentRequest(
        @SerializedName("PaymentRequestId") val paymentRequestId: String?,
        @SerializedName("PaymentAmount") val paymentAmount: Double?,
        @SerializedName("PaymentStatus") val paymentStatus: String?
    )

    data class PaymentMethod(
        @SerializedName("PayPerTask") val payPerTask: PayPerTask?,
        @SerializedName("PayPerHours") val payPerHours: PayPerHours?
    )

    data class PayPerTask(
        @SerializedName("ExperienceLevel") val experienceLevel: String?,
        @SerializedName("FixedPrice") val fixedPrice: String?
    )

    data class PayPerHours(
        @SerializedName("HoursPerWeek") val hoursPerWeek: String?,
        @SerializedName("Duration") val duration: String?,
        @SerializedName("PayPerHour") val payPerHour: String?,
        @SerializedName("ExperienceLevel") val experienceLevel: String?
    )

    data class WorkingFreelancer(
        @SerializedName("FreelancerId") val freelancerId: String?,
        @SerializedName("FreelancerName") val freelancerName: String?
    )

    data class AppliedFreelancer(
        @SerializedName("FreelancerName") val freelancerName: String?,
        @SerializedName("FreelancerId") val freelancerId: String?,
        @SerializedName("Status") val status: String?
    )
}