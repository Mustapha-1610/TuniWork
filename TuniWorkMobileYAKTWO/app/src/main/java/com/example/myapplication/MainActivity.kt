package com.example.myapplication

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.myapplication.CompanyPackage.HomePageCompany
import com.example.myapplication.CompanyPackage.IntroCompany
import com.example.myapplication.CompanyPackage.LoginPage
import com.example.myapplication.FreelancerPackage.HomePage
import com.example.myapplication.dataClasses.Company
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.Gson
import io.github.muddz.styleabletoast.StyleableToast

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val sharedPref = this?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)

        if (sharedPref != null) {
            // Check for freelancer account
            if (sharedPref.contains("freelancer_account")) {
                val freelancerAccountJson = sharedPref?.getString("freelancer_account", null)
                Log.i("Success", "Response: $freelancerAccountJson")

                // Convert JSON back to Freelancer object
                val gson = Gson()
                val freelancer = freelancerAccountJson?.let {
                    gson.fromJson(it, Freelancer::class.java)
                }
                StyleableToast.makeText(this, "Welcome ${freelancer?.Name}", Toast.LENGTH_LONG, R.style.SuccessToast).show()
                val intent = Intent(this, HomePage::class.java)
                startActivity(intent)
            }

            // Check for company account
            else if (sharedPref.contains("company_account")) {
                val companyAccountJson = sharedPref?.getString("company_account", null)
                Log.i("Success", "Response: $companyAccountJson")

                // Convert JSON back to Company object
                val gson = Gson()
                val company = companyAccountJson?.let {
                    gson.fromJson(it, Company::class.java)
                }
                StyleableToast.makeText(this, "Welcome ${company?.CompanyName}", Toast.LENGTH_LONG, R.style.SuccessToast).show()
                //val intent = Intent(this, HomePageCompany::class.java)
                val intent = Intent(this,IntroCompany::class.java)
                startActivity(intent)
            }
        }

        // Check that the activity is using the layout version with the container
        if (savedInstanceState == null) {
            // Create a new fragment to be placed in the activity layout
            val firstFragment = FreelancerFragment()
            //val secondFragment = LoginPage()

            // In case this activity was started with special instructions from an Intent,
            // pass the Intent's extras to the fragment as arguments
            firstFragment.arguments = intent.extras
            //secondFragment.arguments = intent.extras

            // Add the fragment to the 'main_container' FrameLayout
            supportFragmentManager.beginTransaction().add(R.id.main_container, firstFragment).commit()
            //supportFragmentManager.beginTransaction().add(R.id.main_container,secondFragment).commit()
        }
    }
}