package com.example.myapplication.CompanyPackage

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import com.example.myapplication.R
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView

class HomePageCompany : AppCompatActivity() {
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var toggle: ActionBarDrawerToggle

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_page_company)





        drawerLayout = findViewById(R.id.drawerLayout)
        val navView: NavigationView = findViewById(R.id.nav_view)

        // Initialize ActionBarDrawerToggle
        toggle = ActionBarDrawerToggle(this, drawerLayout, R.string.open, R.string.close)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        // Enable the Up button for the ActionBarDrawerToggle
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // Set the toggle to DrawerLayout
        drawerLayout.addDrawerListener(toggle)

        // Handle Bottom Navigation Bar
        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav_bar)
        bottomNav.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {


                //go to home:
                R.id.nav_home -> {
                    // Handle Home button click
                    // Example: navigate to HomeCompany
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, HomeCompany())
                        .commit()
                    true
                }

                //go to freelancers page:
                R.id.nav_browse -> {
                    // Handle Home button click
                    // Example: navigate to HomeCompany
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, TalentFreelancer())
                        .commit()
                    true
                }


                //go to profile:
                R.id.nav_profile -> {
                    // Handle Profile button click
                    // Example: navigate to ProfilePage
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, com.example.myapplication.CompanyPackage.ProfilePage())
                        .commit()
                    true
                }


                // go to settings:
                R.id.nav_settings -> {
                    // Handle Settings button click
                    // Example: navigate to SettingsPage
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, com.example.myapplication.CompanyPackage.SettingsPage())
                        .commit()
                    true
                }






                else -> false
            }
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Toggle navigation drawer on toolbar icon click
        return if (toggle.onOptionsItemSelected(item)) {
            true
        } else super.onOptionsItemSelected(item)
    }
}