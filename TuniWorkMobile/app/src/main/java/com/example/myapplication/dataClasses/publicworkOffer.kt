import java.util.Date

data class PublicJobOffer(
    val id: String? = null,
    val title: String,
    val startTime: Date?,
    val deadline: Date?,
    val workTitle: String,
    val creationDate: Date = Date(),
    val description: String,
    val note: String?,
    val paymentMethod: PaymentMethod? = null,
    val workSpeciality: List<String>,
    val workingFreelancer: WorkingFreelancer? = null,
    val companyName: String,
    val companySignature: String = "",
    val location: String?,
    val companyId: String,
    val paymentMethodVerificationStatus: Boolean = false,
    val totalWorkOfferd: Int,
    val totalMoneyPayed: Double,
    val status: JobOfferStatus = JobOfferStatus.AWAITING_APPLICATION_REQUESTS,
    val appliedFreelancers: List<AppliedFreelancer> = emptyList()
) {
    data class PaymentMethod(
        val payPerTask: PayPerTask? = null,
        val payPerHours: PayPerHours? = null
    )

    data class PayPerTask(
        val experienceLevel: String?,
        val fixedPrice: String?
    )

    data class PayPerHours(
        val hoursPerWeek: String?,
        val duration: String?,
        val payPerHour: String?,
        val experienceLevel: String?
    )

    data class WorkingFreelancer(
        val freelancerId: String,
        val freelancerName: String
    )

    data class AppliedFreelancer(
        val freelancerName: String,
        val freelancerId: String,
        val status: ApplicationStatus = ApplicationStatus.PENDING
    )

    enum class JobOfferStatus {
        AWAITING_APPLICATION_REQUESTS,
        FREELANCER_ACCEPTED,
        CONTRACT_SENT_AWAITING_FREELANCER_RESPONSE,
        DECLINED,
        ACCEPTED,
        IN_PROGRESS,
        DONE
    }

    enum class ApplicationStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}
