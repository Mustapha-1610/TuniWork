package com.example.myapplication

import com.example.myapplication.dataClasses.Company
import com.example.myapplication.dataClasses.Freelancer
import com.example.myapplication.dataClasses.PrivateJobOffer
import com.example.myapplication.dataClasses.PublicJobOffer
import com.google.gson.annotations.SerializedName
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {
    @POST("/api/city/getMunicipality")
    suspend fun getOffres(): Response<String>


    data class AuthRequest(
        val Email: String,
        val Password: String
    )
    data class FreelancerResponse(
        @SerializedName("freelancerAccount") val freelancerAccount: com.example.myapplication.dataClasses.Freelancer,
        @SerializedName("error") val error : String = "",
        @SerializedName("emailError") val emailError : String = "",
        @SerializedName("success") val success : String = "",
    )
    @POST("/api/freelancer/multiAuth")
    suspend fun freelancerAuth(@Body authRequest: AuthRequest): Response<FreelancerResponse>

    data class signupRequest(
        val Name : String,
        val Surname : String,
        val PhoneNumber : Int,
        val Email : String,
        val Password: String,
        val HourlyPayRate : Int,
        val PayPerTaskRate : Int,
        val WorkTitle : String,
        val Speciality : String,
        val City : String,
        val Municipality : String
    )
    @POST("/api/freelancer/createMobile")
    suspend fun create(@Body signupRequest: signupRequest): Response<FreelancerResponse>
    data class MatchingPublicWorkOffersResponse(
        @SerializedName("matchingJobOffers") val matchingJobOffers : List<PublicJobOffer>
    )
    data class SendRequest(
        @SerializedName("freelancerId") val freelancerId : String
    )
    @POST("/api/companyWorkOffer/getMatchingPublicWorkOffers")
    suspend fun getAll(@Body freelancerId : SendRequest) : Response<MatchingPublicWorkOffersResponse>



    /*company*/

    /****************GENERAL ***********************/
    data class CompanyResponse(
        @SerializedName("error") val error: String = "",
        @SerializedName("success") val success: String? = null,
        @SerializedName("companyAccount") val companyAccount: Company,
        @SerializedName("emailError") val emailError: String = "",
    )

    data class SendRequestCompany(
        @SerializedName("companyId") val companyId: String
    )
    /******************************/



    /**********AUTH****************/

    data class CompanySignupRequest(
        val CompanyName: String,
        val CompanyDescription: String,
        val CompanyEmail: String,
        val CompanyPhone: Int,
        val CompanyWebsite: String,
        val Password: String,
        val WorkTitle: String,
        val Location: String,
        val City: String,
        val Municipality: String
    )

    @POST("/api/company/createMobileAccount")
    suspend fun createCompany(@Body signupRequest: CompanySignupRequest): Response<CompanyResponse>

    @POST("/api/company/auth")
    suspend fun companyAuth(@Body authRequest: CompanyAuthRequest): Response<CompanyResponse>

    data class CompanyAuthRequest(
        @SerializedName("CompanyEmail") val CompanyEmail: String,
        @SerializedName("Password") val Password: String
    )
    /******************************/



    /******** public job offer *******/
    data class CreatePublicJobRequest(
        val Title: String,
        val StartTime: String,
        val DeadLine: String,
        val WorkTitle: String,
        val Description: String,
        val PayPerTask: PayPerTask,
        val WorkSpeciality: String,
        val Note: String,
        val CompanyName: String?,
        val CompanyId: String?,
    )
    data class PayPerTask(
        val ExperienceLevel: String,
        val FixedPrice: String
    )

    data class PublicWorkOffersResponse(
        @SerializedName("publicJobOffers") val jobOffers: List<PublicJobOffer>
    )

    @POST("/api/companyWorkOffer/getAllPublicJobOffersMob")
    suspend fun getAllPublicJobOffersMob(@Body companyId: SendRequestCompany): Response<List<PublicJobOffer>>

    @DELETE("/api/companyWorkOffer/cancelPublicJobOfferMob/{idPubJob}")
    suspend fun cancelPublicJobOfferMob(@Path("idPubJob") idPubJob: String): Response<Unit>


    @POST("/api/companyWorkOffer/createPublicJobMobile")
    suspend fun createPublicJob(@Body request: CreatePublicJobRequest): Response<CompanyResponse>
    /******************************/



    /******** private  job offer *******/
    data class CreatePrivateJobRequest(
        val Title: String,
        val StartTime: String,
        val DeadLine: String,
        val Description: String,
        val FixedPrice: String,
        val Note: String,
        val CompanyName: String?,
        val CompanyId: String?,
        val FreelancerId: String?,
    )


    data class PrivateWorkOffersResponse(
        @SerializedName("privateJobOffers") val prvJobOffers: List<PrivateJobOffer>
    )

    @POST("/api/companyWorkOffer/createPrivateJobMob")
    suspend fun createPrivateJob(@Body request: CreatePrivateJobRequest): Response<CompanyResponse>



    @DELETE("/api/companyWorkOffer/cancelPrivateJobOfferMob/{idPrvJob}")
    suspend fun cancelPrivateJobOfferMob(@Path("idPrvJob") idPrvJob: String): Response<Unit>



    @POST("/api/companyWorkOffer/getAllPrivateJobOffersMob")
    suspend fun getAllPrivateJobOffersMob(@Body companyId: SendRequestCompany): Response<List<PrivateJobOffer>>


    /******************************/






/*****************TALENT FREELANCER **********/

class Freelancer {
     val _id: String? = null
     val Name: String? = null
     val Surname: String? = null
     val ProfilePicture: String? = null // Add other fields and getters/setters as needed
     val WorkTitle:  WorkTitle?= null
}

    data class WorkTitle(
        @SerializedName("WorkTitleId") val workTitleId: String,
        @SerializedName("WorkTitleText") val workTitleText: String?
    )

    @GET("/api/company/getAllFreelancers")
    suspend fun getAllFreelancers(): Response<FreelancerResponseTalent>

    data class FreelancerResponseTalent(
        @SerializedName("freelancers") val freelancers: List<Freelancer>
    )

    /***********************************/

}