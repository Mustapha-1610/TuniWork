package com.example.myapplication.CompanyPackage

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.ApiClient
import com.example.myapplication.ApiService
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Company
import io.github.muddz.styleabletoast.StyleableToast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

class SignupPage : Fragment() {
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
        val view = inflater.inflate(R.layout.fragment_signup_page_company, container, false);
        return view
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val signupButton: Button? = view?.findViewById(R.id.SignupButton)

        signupButton?.setOnClickListener {
            val CompanyName: TextView? = view?.findViewById(R.id.CompanyName)
            val CompanyWebsite: TextView? = view?.findViewById(R.id.CompanyWebsite)
            val CompanyEmail: TextView? = view?.findViewById(R.id.CompanyEmail)
            val password: TextView? = view?.findViewById(R.id.Password)
            val CompanyPhone: TextView? = view?.findViewById(R.id.CompanyPhone)
            val workTitle: TextView? = view?.findViewById(R.id.WorkTitle)
            val Location: TextView? = view?.findViewById(R.id.Location)
            val City: TextView? = view?.findViewById(R.id.City)
            val Municipality: TextView? = view?.findViewById(R.id.Municipality)
            val CompanyDescription: TextView? = view?.findViewById(R.id.CompanyDescription)



            if (CompanyName?.text!!.isEmpty()  || CompanyWebsite?.text!!.isEmpty()  || CompanyEmail?.text!!.isEmpty()  || password?.text!!.isEmpty()  || CompanyPhone?.text!!.isEmpty()  || workTitle?.text!!.isEmpty()  || Location?.text!!.isEmpty()  ||
                City?.text!!.isEmpty()  || Municipality?.text!!.isEmpty()  || CompanyDescription?.text!!.isEmpty() ){
                StyleableToast.makeText(requireContext(),  "Missing Inputs", Toast.LENGTH_LONG, R.style.ErrorToast).show();
            }else {
                val scope = CoroutineScope(Dispatchers.Main)
                val CompanySignupRequest = ApiService.CompanySignupRequest(
                    CompanyName?.text.toString(),
                    CompanyDescription?.text.toString(),
                    CompanyEmail?.text.toString(),
                    CompanyPhone?.text.toString().toInt(),
                    CompanyWebsite?.text.toString(),
                    password?.text.toString(),
                    workTitle?.text.toString(),
                    Location?.text.toString(),
                    City?.text.toString(),
                    Municipality?.text.toString(),
                )
                scope.launch {
                    val response: Response<ApiService.CompanyResponse> = ApiClient.apiService.createCompany(CompanySignupRequest)
                    if (response.isSuccessful && response.body() != null) {
                        val res = response.body();
                        if (!res?.error.equals(null)){
                            StyleableToast.makeText(requireContext(),  res?.error, Toast.LENGTH_LONG, R.style.ErrorToast).show();
                        }else if (!res?.success.equals(null)){
                            StyleableToast.makeText(requireContext(),  res?.success, Toast.LENGTH_LONG, R.style.SuccessToast).show();
                        }
                    }
                }
            }
        }
    }


    companion object {

        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            SignupPage().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}