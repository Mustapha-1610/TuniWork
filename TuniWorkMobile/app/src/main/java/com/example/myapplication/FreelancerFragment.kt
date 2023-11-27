package com.example.myapplication

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
import android.widget.Toast
import com.example.myapplication.FreelancerPackage.HomePage
import com.example.myapplication.FreelancerPackage.ProfilePage
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import io.github.muddz.styleabletoast.StyleableToast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response
import retrofit2.http.Body
import java.lang.Exception

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"
class FreelancerFragment : Fragment() {
    // TODO: Rename and change types of parameters
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
        val view = inflater.inflate(R.layout.fragment_freelancer, container, false)
        val loginButton : Button = view.findViewById(R.id.LoginButton)
        val Email : EditText = view.findViewById(R.id.Email)
        val Password : EditText = view.findViewById(R.id.Password)
        val scope = CoroutineScope(Dispatchers.Main)
        loginButton.setOnClickListener {
            scope.launch {
                try {
                    // Retrieve the text from the EditText views and trim any whitespace
                    val email = Email.text.toString().trim()
                    val password = Password.text.toString().trim()

                    // Create an AuthRequest instance with the retrieved email and password
                    val authRequest = ApiService.AuthRequest(email, password)


                    // Make the API call with the AuthRequest instance
                    val response: Response<ApiService.FreelancerResponse> = ApiClient.apiService.freelancerAuth(authRequest)
                    val freelancer: Freelancer? = response.body()?.freelancerAccount

                        if (response.isSuccessful && response.body() != null) {
                        val freelancerAccount = response.body()

                            if (freelancerAccount?.error.equals(null) && freelancerAccount?.emailError.equals(null)){

                                Log.i("Success", "Response: ${response.body()}")
                                Log.i("Success", "Name: ${(freelancerAccount?.freelancerAccount?.Name)}")

                                // Convert freelancerAccount to JSON
                                val gson = Gson()
                                val freelancerAccountJson = gson.toJson(freelancerAccount?.freelancerAccount)
                                StyleableToast.makeText(requireContext(),  "Welcome ${(freelancerAccount?.freelancerAccount?.Name)}", Toast.LENGTH_LONG, R.style.SuccessToast).show();
                                // Get SharedPreferences
                                val sharedPref = context?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
                                if (sharedPref != null) {
                                    with(sharedPref.edit()) {
                                        // Save the JSON string
                                        putString("freelancer_account", freelancerAccountJson)
                                        apply()
                                    }
                                }

                                val intent = Intent(requireContext(), HomePage::class.java)
                                startActivity(intent)

                            }
                            else if (!freelancerAccount?.emailError.equals(null)){
                                val errorMessage = response.body()
                                StyleableToast.makeText(requireContext(),  errorMessage?.emailError.toString(), Toast.LENGTH_LONG, R.style.ErrorToast).show();

                            }
                            else {
                                val errorMessage = response.body()
                                Log.i("AAAAAAAAA" , "ERROR ERROR")
                                StyleableToast.makeText(requireContext(),  errorMessage!!.error.toString(), Toast.LENGTH_LONG, R.style.ErrorToast).show();
                            }

                    } else {

                        Log.e("Error", "Response Code: ${response.code()} - Message: ${response.errorBody()}")
                    }
                } catch (err: Exception) {

                    // Log exception and print the error message
                    Log.e("API Error", "Exception: ${err.message}")
                }
            }
        }

        return view
    }
    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            FreelancerFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}