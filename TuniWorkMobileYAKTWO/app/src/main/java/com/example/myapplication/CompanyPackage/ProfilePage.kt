package com.example.myapplication.CompanyPackage

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.example.myapplication.FreelancerPackage.Email
import com.example.myapplication.FreelancerPackage.Id
import com.example.myapplication.FreelancerPackage.Name
import com.example.myapplication.FreelancerPackage.PhoneNumber
import com.example.myapplication.FreelancerPackage.Surname
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Company
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.Gson
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

lateinit var CompanyName : TextView;
lateinit var CompanyDescription : TextView;
lateinit var CompanyEmail : TextView
lateinit var CompanyPhone : TextView
class ProfilePage : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null
    private var name : TextView? = null;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        name = view?.findViewById(R.id.CompanyName) ?: null
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile_page_company, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        CompanyName = view.findViewById(R.id.CompanyName)
        CompanyDescription = view.findViewById(R.id.CompanyDescription)
        CompanyEmail = view.findViewById(R.id.CompanyEmail)
        CompanyPhone = view.findViewById(R.id.CompanyPhone)
        Id = view.findViewById(R.id.Id)

        super.onViewCreated(view, savedInstanceState)
        val sharedPref = activity?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val companyAccountJson = sharedPref?.getString("company_account", null)
        val gson = Gson()
        val company = companyAccountJson?.let {
            gson.fromJson(it, Company::class.java)
        }
        Log.i("SUCCESS", "Company Name: ${company?.CompanyName}")
        Log.i("SUCCESS",company?.profilePicture.toString())
        val imageUrl = company?.profilePicture.toString()
        val imageView: ImageView = view.findViewById(R.id.imageView)
        Picasso.get()
            .load(imageUrl) // add an error placeholder to see if there's an error loading the image
            .into(imageView, object : Callback {
                override fun onSuccess() {
                }
                override fun onError(e: Exception?) {
                    e?.printStackTrace()
                }
            })
        CompanyName.setText( "comp name: " + company?.CompanyName.toString())
        CompanyEmail.setText("email : " + company?.CompanyEmail.toString())
        CompanyDescription.setText("description : " + company?.CompanyDescription.toString())
        CompanyPhone.setText("company phone : " + company?.CompanyPhone.toString())
        Id.setText("company id: "+company?.id.toString())
    }
    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ProfilePage().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}