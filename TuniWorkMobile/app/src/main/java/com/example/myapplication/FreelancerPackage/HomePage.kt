package com.example.myapplication.FreelancerPackage

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.myapplication.FreelancerFragment
import com.example.myapplication.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class HomePage : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_page)
        if (savedInstanceState == null) {
            // Create a new fragment to be placed in the activity layout
            val firstFragment = Home()

            // In case this activity was started with special instructions from an Intent,
            // pass the Intent's extras to the fragment as arguments
            firstFragment.arguments = intent.extras

            // Add the fragment to the 'main_container' FrameLayout
            supportFragmentManager.beginTransaction()
                .add(R.id.Home_Container, firstFragment).commit()
        }
        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav_bar)
        bottomNav.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    // Handle Home button click
                    // Example: navigate to HomeFragment
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, Home())
                        .commit()
                    true
                }
                R.id.nav_browse -> {
                    // Handle Browse button click
                    // Example: navigate to BrowseFragment
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, BrowsePage())
                        .commit()
                    true
                }
                R.id.nav_profile -> {
                    // Handle Profile button click
                    // Example: navigate to ProfileFragment
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, ProfilePage())
                        .commit()
                    true
                }
                R.id.nav_settings -> {
                    // Handle Settings button click
                    // Example: navigate to SettingsFragment
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, SettingsPage())
                        .commit()
                    true
                }
                else -> false
            }
        }
    }

}