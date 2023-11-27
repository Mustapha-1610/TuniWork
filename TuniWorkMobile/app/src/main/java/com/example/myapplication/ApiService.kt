package com.example.myapplication

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
        @SerializedName("emailError") val emailError : String = ""
    )
    @POST("/api/freelancer/multiAuth")
    suspend fun freelancerAuth(@Body authRequest: AuthRequest): Response<FreelancerResponse>
}