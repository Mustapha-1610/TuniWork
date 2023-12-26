package com.example.myapplication.CompanyPackage

import android.annotation.SuppressLint
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.myapplication.R
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import android.content.Intent
import android.view.View
import android.widget.Button
import com.example.myapplication.R.id.goToHomePageButton
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.dataClasses.Company
import com.google.gson.Gson

class IntroCompany : AppCompatActivity() {
    lateinit var toggle: ActionBarDrawerToggle
    private lateinit var goToJobOfferButton: Button
    private lateinit var goToHomePageButton:Button
    private lateinit var CompanyEmail:TextView
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_intro_company)
        val actionBar = supportActionBar
        actionBar?.setDisplayShowCustomEnabled(true)
        actionBar?.setDisplayShowTitleEnabled(false)
        actionBar?.setCustomView(R.layout.custom_actionbar_title)

        val drawerLayout: DrawerLayout = findViewById(R.id.drawerLayout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        toggle = ActionBarDrawerToggle(this, drawerLayout, R.string.open, R.string.close)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        navView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.settings -> {
                    val intent = Intent(this, SettingsPage::class.java)
                    startActivity(intent)
                    true
                }
                else -> {
                    true
                }
            }
        }

        // Add the following lines to set the email dynamically
        /*val sharedPref = getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val companyAccountJson = sharedPref?.getString("company_account", null)
        val gson = Gson()
        val company = companyAccountJson?.let {
            gson.fromJson(it, Company::class.java)
        }
        val CompanyEmail = findViewById<TextView>(R.id.CompanyEmail)
        CompanyEmail.setText(company?.CompanyEmail.toString())*/




        // navigate to create public job offer
        goToJobOfferButton = findViewById<Button>(R.id.goToJobOfferButton)
        goToJobOfferButton.setOnClickListener(View.OnClickListener {
            val intent = Intent(this, PublicJob::class.java)
            startActivity(intent)


        })

        //navigate to homepage
        goToHomePageButton = findViewById<Button>(R.id.goToHomePageButton)
        goToHomePageButton.setOnClickListener(View.OnClickListener {
            val intent = Intent(this, HomePageCompany::class.java)
            startActivity(intent)
        })


    }
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return toggle.onOptionsItemSelected(item)
    }
}