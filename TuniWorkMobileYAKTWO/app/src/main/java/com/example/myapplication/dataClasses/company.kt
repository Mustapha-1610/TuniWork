package com.example.myapplication.dataClasses

import com.google.gson.annotations.SerializedName
import java.util.Date

data class Company(
    @SerializedName("CompanyName") val CompanyName: String,
    @SerializedName("CompanyDescription") val CompanyDescription: String,
    @SerializedName("CompanyEmail") val CompanyEmail: String,
    @SerializedName("CompanyPhone") val CompanyPhone: Long,

    @SerializedName("Password") val Password: String,
    @SerializedName("CompanyWebsite") val CompanyWebsite: String,
    @SerializedName("ProfilePicture") val profilePicture: String = "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
    @SerializedName("Location") val location: String,
    @SerializedName("VerificationCode") val verificationCode: String?,
    @SerializedName("AccountActivationStatus") val accountActivationStatus: Boolean = true,
    @SerializedName("JoinDate") val joinDate: Date,  // Change the type to Date if needed
    /*@SerializedName("WorkOffered") val workOffered: Int = 0,
    @SerializedName("savedFreelancers") val savedFreelancers: List<SavedFreelancer>,
    @SerializedName("freelancerSentContracts") val freelancerSentContracts: List<String>, */
    @SerializedName("WorkTitle") val workTitle: WorkTitle,
    @SerializedName("Languages") val languages: List<String>,
    @SerializedName("_id") val id : String,

)

data class WorkTitleCompany(
    @SerializedName("WorkTitleId") val workTitleId: String,  // Change the type to ObjectId if needed
    @SerializedName("WorkTitleText") val workTitleText: String?
)



/*data class SavedFreelancer(
    @SerializedName("freelancerId") val freelancerId: String,  // Change the type to ObjectId if needed
    @SerializedName("freelancerName") val freelancerName: String

    data class EstimateWorkLocationCompany(
    @SerializedName("City") val city: String?,
    @SerializedName("Municipality") val municipality: String?
)
) */