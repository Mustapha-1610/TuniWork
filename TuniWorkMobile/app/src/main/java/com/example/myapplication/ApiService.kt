package com.example.myapplication

import PublicJobOffer
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.annotations.SerializedName
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {

    @POST("/api/city/getMunicipality")
    suspend fun getOffres(): Response<String>

    @GET("/Offre/{uid}")
    suspend fun getOffersById(@Path("uid") offerId: Int): Response<offre>

    @POST("/Offre")
    suspend fun createOffre(@Body offre: offre): Response<offre>

    @PUT("/Offre/{id}")
    suspend fun updateOffre(@Path("id") offerId: Int, @Body updatedOffre: offre) : Response<offre>

    @DELETE("/Offre/{uid}")
    suspend fun deleteOffre(@Path("uid") offerId: Int) : Response<String>

    data class AuthRequest(
        val Email: String,
        val Password: String
    )
    data class FreelancerResponse(
        @SerializedName("freelancerAccount") val freelancerAccount: Freelancer,
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

    @GET ("/api/freelancer/cleanNotifications")
    suspend fun cleanNotifications()
    @GET ("/api/freelancer/refreshProfile")
    suspend fun refreshFreelancerProfile() : Response<FreelancerResponse>
    @POST ("/api/freelancer/refreshProfileMobile")
    suspend fun refreshFreelancerProfileHomePage(@Body freelancerId : SendRequest) : Response<FreelancerResponse>
}