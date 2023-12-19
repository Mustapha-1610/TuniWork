package com.example.myapplication.dataClasses

import com.google.gson.annotations.SerializedName

data class Freelancer(
    @SerializedName("Name") val Name: String?,
    @SerializedName("Surname") val Surname: String?,
    @SerializedName("PhoneNumber") val phoneNumber: Long?,
    @SerializedName("ProfilePicture") val profilePicture: String?,
    @SerializedName("Email") val email: String,
    @SerializedName("Password") val password: String,
    @SerializedName("VerificationCode") val verificationCode: String?,
    @SerializedName("AccountActivationStatus") val accountActivationStatus: Boolean = true,
// ... (other fields)
@SerializedName("AccountVerificationStatus") val accountVerificationStatus: Boolean = false,
// ... (other field
@SerializedName("Earnings") val earnings: Double = 0.0,
    @SerializedName("PayRate") val payRate: PayRate,
    @SerializedName("WorkHistory") val workHistory: WorkHistory,
    @SerializedName("Schedule") val schedule: List<String>,
    @SerializedName("Messages") val messages: List<String>,
    @SerializedName("Languages") val languages: List<String>,
    @SerializedName("EstimateWorkLocation") val estimateWorkLocation: EstimateWorkLocation,
    @SerializedName("WorkTitle") val workTitle: WorkTitle,
    @SerializedName("SavedWorkOffers") val savedWorkOffers: List<SavedWorkOffer>,
    @SerializedName("Speciality") val speciality: List<String>,
    @SerializedName("VerLinkExpDate") val verLinkExpDate: String?,
    @SerializedName("PassChangeLinkExpDate") val passChangeLinkExpDate: String?,
    @SerializedName("ProposedPrivateWorks") val proposedPrivateWorks: List<ProposedPrivateWork>,
    @SerializedName("PendingWorkOffers") val pendingWorkOffers: List<PendingWorkOffer>,
    @SerializedName("CompanyReceivedContracts") val companyReceivedContracts: List<String?>,
    @SerializedName("_id") val id : String
)

data class PayRate(
    @SerializedName("HourlyRate") val hourlyRate: Double,
    @SerializedName("payPerTaskRate") val payPerTaskRate: Double
)

data class WorkHistory(
    @SerializedName("Ongoing") val ongoing: List<OngoingTask>,
    @SerializedName("Finished") val finished: List<FinishedTask>
)

data class OngoingTask(
    @SerializedName("TaskTitle") val taskTitle: String?,
    @SerializedName("TaskHolder") val taskHolder: String,
    @SerializedName("DueDate") val dueDate: String?
)

data class FinishedTask(
    @SerializedName("TaskTitle") val taskTitle: String?,
    @SerializedName("TaskHolder") val taskHolder: String,
    @SerializedName("EarningsMade") val earningsMade: Double?,
    @SerializedName("Review") val review: String?
)

data class Schedule(
    @SerializedName("Weekly") val weekly: List<String>,
    @SerializedName("Monthly") val monthly: List<String>
)

data class EstimateWorkLocation(
    @SerializedName("City") val city: String?,
    @SerializedName("Municipality") val municipality: String?
)

data class WorkTitle(
    @SerializedName("WorkTitleId") val workTitleId: String,
    @SerializedName("WorkTitleText") val workTitleText: String?
)

data class SavedWorkOffer(
    @SerializedName("WorkId") val workId: String,
    @SerializedName("WorkTitle") val workTitle: String?,
    @SerializedName("WorkDescription") val workDescription: String?
)

data class ProposedPrivateWork(
    @SerializedName("PrivateJobOfferId") val privateJobOfferId: String,
    @SerializedName("Status") val status: String = "awaiting response"
)

data class PendingWorkOffer(
    @SerializedName("PublicJobOfferId") val publicJobOfferId: String,
    @SerializedName("Status") val status: String = "awaiting company response",
    @SerializedName("PWOInfos") val pwoInfos: PWOInfos
)

data class PWOInfos(
    @SerializedName("CName") val cName: String?,
    @SerializedName("TitlePWO") val titlePWO: String?,
    @SerializedName("DescriptionPWO") val descriptionPWO: String?
)
