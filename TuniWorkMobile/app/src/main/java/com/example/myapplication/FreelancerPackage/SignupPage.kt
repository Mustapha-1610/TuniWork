package com.example.myapplication.FreelancerPackage

import android.os.Bundle
import android.provider.ContactsContract.CommonDataKinds.Email
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
import io.github.muddz.styleabletoast.StyleableToast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [SignupPage.newInstance] factory method to
 * create an instance of this fragment.
 */
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
        val view = inflater.inflate(R.layout.fragment_signup_page, container, false)
        // Inflate the layout for this fragment
        return view
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val signupButton: Button? = view?.findViewById(R.id.SignupButton)

        signupButton?.setOnClickListener {
            val name: TextView? = view?.findViewById(R.id.Name)
            val surname: TextView? = view?.findViewById(R.id.Surname)
            val email: TextView? = view?.findViewById(R.id.Email)
            val password: TextView? = view?.findViewById(R.id.Password)
            val phoneNumber: TextView? = view?.findViewById(R.id.PhoneNumber)
            val workTitle: TextView? = view?.findViewById(R.id.WorkTitle)
            val speciality: TextView? = view?.findViewById(R.id.Speciality)
            val city: TextView? = view?.findViewById(R.id.City)
            val municipality: TextView? = view?.findViewById(R.id.Municipality)
            val hourlyPayRate: TextView? = view?.findViewById(R.id.HourlyRate)
            val payPerTaskRate: TextView? = view?.findViewById(R.id.PayPerTaskRate)
            if (name?.text!!.isEmpty()  || surname?.text!!.isEmpty()  || email?.text!!.isEmpty()  || password?.text!!.isEmpty()  || phoneNumber?.text!!.isEmpty()  || workTitle?.text!!.isEmpty()  || speciality?.text!!.isEmpty()  ||
                city?.text!!.isEmpty()  || municipality?.text!!.isEmpty()  || hourlyPayRate?.text!!.isEmpty()  || payPerTaskRate?.text!!.isEmpty()
                ){
                StyleableToast.makeText(requireContext(),  "Missing Inputs", Toast.LENGTH_LONG, R.style.ErrorToast).show();
            }else {
                val scope = CoroutineScope(Dispatchers.Main)
                val signupRequest = ApiService.signupRequest(
                    name?.text.toString(),
                    surname?.text.toString(),
                    phoneNumber?.text.toString().toInt(),
                    email?.text.toString(),
                    password?.text.toString(),
                    hourlyPayRate?.text.toString().toInt(),
                    payPerTaskRate?.text.toString().toInt(),
                    workTitle?.text.toString(),
                    speciality?.text.toString(),
                    city?.text.toString(),
                    municipality?.text.toString()
                )
                scope.launch {
                    val response: Response<ApiService.FreelancerResponse> = ApiClient.apiService.create(signupRequest)
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
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment SignupPage.
         */
        // TODO: Rename and change types and number of parameters
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