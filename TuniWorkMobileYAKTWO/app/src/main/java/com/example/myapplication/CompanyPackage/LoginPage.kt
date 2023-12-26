package com.example.myapplication.CompanyPackage

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.ApiClient
import com.example.myapplication.ApiService
import com.example.myapplication.FreelancerPackage.HomePage
import com.example.myapplication.R
import com.google.gson.Gson
import io.github.muddz.styleabletoast.StyleableToast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response
import java.lang.Exception
import com.example.myapplication.CompanyPackage.LoginPage
import com.example.myapplication.FreelancerPackage.Home
import com.example.myapplication.FreelancerPackage.ProfilePage
import com.example.myapplication.FreelancerPackage.SignupPage
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.annotations.SerializedName
import kotlinx.coroutines.launch
import retrofit2.http.Body


private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"
class LoginPage : Fragment() {

    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_login_page_company, container, false);
        return view;
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val loginButton: Button = view.findViewById(R.id.LoginButton)
        val CompanyEmail: EditText = view.findViewById(R.id.CompanyEmail)
        val Password: EditText = view.findViewById(R.id.Password)
        val scope = CoroutineScope(Dispatchers.Main)




        loginButton.setOnClickListener {
            scope.launch {
                try {
                    // Retrieve the text from the EditText views and trim any whitespace
                    val email = CompanyEmail.text.toString().trim()
                    val password = Password.text.toString().trim()

                    if (email.isEmpty() || password.isEmpty()) {
                        StyleableToast.makeText(requireContext(), "Missing Input(s)", Toast.LENGTH_LONG, R.style.ErrorToast).show()
                    } else {
                        val authRequest = ApiService.CompanyAuthRequest(email, password)
                        val response: Response<ApiService.CompanyResponse> = ApiClient.apiService.companyAuth(authRequest)

                        if (response.isSuccessful) {
                            val companyAccount = response.body()?.companyAccount
                            if (companyAccount != null) {
                                val gson = Gson()
                                val companyAccountJson = gson.toJson(companyAccount)

                                StyleableToast.makeText(requireContext(), "Welcome ${(companyAccount?.CompanyName)}", Toast.LENGTH_LONG, R.style.SuccessToast).show()

                                // Get SharedPreferences
                                val sharedPref = context?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)

                                if (sharedPref != null) {
                                    with(sharedPref.edit()) {
                                        // Save the JSON string
                                        putString("company_account", companyAccountJson)
                                        apply()
                                    }
                                }
                                val intent = Intent(requireContext(), IntroCompany::class.java)

                                //val intent = Intent(requireContext(), HomePageCompany::class.java)
                                startActivity(intent)
                            } /*else {
                                val errorMessage = companyAccount?.error ?: "Unknown error"
                                Log.i("ERROR", "Error: $errorMessage")
                                StyleableToast.makeText(requireContext(), errorMessage, Toast.LENGTH_LONG, R.style.ErrorToast).show()
                            } */
                        } else {
                            Log.e("Error", "Response Code: ${response.code()} - Message: ${response.errorBody()}")
                        }
                    }
                } catch (err: Exception) {
                    // Log exception and print the error message
                    Log.e("API Error", "Exception: ${err.message}")
                }
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            LoginPage().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}