package com.example.myapplication

import android.content.Context
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.HttpUrl

class SimpleCookieJar() : CookieJar {

    private val cookieStore = mutableMapOf<String, List<Cookie>>()

    override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
        cookieStore[url.host] = cookies
        // Save cookies to persistent storage (e.g., SharedPreferences)
        saveCookiesToStorage()
    }

    override fun loadForRequest(url: HttpUrl): List<Cookie> {
        // Load cookies from persistent storage (e.g., SharedPreferences)
        loadCookiesFromStorage()
        return cookieStore[url.host] ?: emptyList()
    }

    private fun saveCookiesToStorage() {
        // Implement saving cookies to persistent storage (e.g., SharedPreferences)
    }

    private fun loadCookiesFromStorage() {
        // Implement loading cookies from persistent storage (e.g., SharedPreferences)
    }
}

object ApiClient {

    private const val BASE_URL: String = "http://192.168.1.20:5000"

    private val gson: Gson by lazy {
        GsonBuilder().setLenient().create()
    }

    private val httpClient: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .cookieJar(SimpleCookieJar())
            .addInterceptor(HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            })
            .build()
    }

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }

    val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}