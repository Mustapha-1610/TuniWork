package com.example.myapplication.dataClasses

import java.util.Date

data class publicworkOffer(
    val title: String,
    val workTitle: String? = null,
    val creationDate: Date = Date(),
    val description: String,
    val note: String? = null,
    val paymentMethod: PaymentMethod,
    val workSpeciality: List<String>,
    val workingFreelancer: FreelancerInfo? = null,
    val companyName: String,
    val location: String? = null,
    val companyId: String,
    val paymentMethodVerificationStatus: Boolean = false,
    val totalWorkOffered: Int? = null,
    val totalMoneyPayed: Int? = null,
    val status: JobStatus = JobStatus.AWAITING_APPLICATION_REQUESTS,
    val appliedFreelancers: List<FreelancerApplicationInfo>? = null
)

enum class JobStatus {
    AWAITING_APPLICATION_REQUESTS,
    IN_PROGRESS,
    DONE
}

data class FreelancerInfo(
    val freelancerName: String? = null,
    val freelancerId: String? = null
)

data class FreelancerApplicationInfo(
    val freelancerName: String? = null,
    val freelancerId: String? = null,
    val status: ApplicationStatus = ApplicationStatus.PENDING
)

enum class ApplicationStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

data class PaymentMethod(
    val payPerTask: PayPerTask? = null,
    val payPerHours: PayPerHour? = null
)
data class PayPerTask(
    val experienceLevel: String? = null,
    val fixedPrice: String? = null
)

data class PayPerHour(
    val hoursPerWeek: String? = null,
    val duration: String? = null,
    val payPerHour: String? = null,
    val experienceLevel: String? = null
)

