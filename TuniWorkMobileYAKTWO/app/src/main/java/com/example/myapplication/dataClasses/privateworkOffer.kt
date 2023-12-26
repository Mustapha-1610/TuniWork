package com.example.myapplication.dataClasses

import com.google.gson.annotations.SerializedName
import java.util.Date


data class PrivateJobOffer(
    @SerializedName("TaskTable") val taskTable: ArrayList<Task>,
    @SerializedName("PaymentRequest") val paymentRequest: PaymentRequest?,
    @SerializedName("Title") val title: String?,
    @SerializedName("StartTime") val startTime: Date?,
    @SerializedName("DeadLine") val deadline: Date?,
    @SerializedName("CreationDate") val creationDate: Date?,
    @SerializedName("Description") val description: String?,
    @SerializedName("Note") val note: String?,
    @SerializedName("FixedPrice") val fixedprice: String?,
    @SerializedName("WorkingFreelancer") val workingFreelancer: WorkingFreelancer?,
    @SerializedName("CompanyName") val companyName: String?,
    @SerializedName("Location") val location: String?,
    @SerializedName("CompanyId") val companyId: String?,
    @SerializedName("PaymentMethodVerificationStatus") val paymentMethodVerificationStatus: Boolean?,
    @SerializedName("TotalWorkOfferd") val totalWorkOfferd: Int?,
    @SerializedName("TotalMoneyPayed") val totalMoneyPayed: Double?,
    @SerializedName("status") val status: String?,
    @SerializedName("_id") val idPrvJob : String

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


    data class WorkingFreelancer(
        @SerializedName("FreelancerId") val freelancerId: String?,
        @SerializedName("FreelancerName") val freelancerName: String?
    )

}