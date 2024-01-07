package com.example.myapplication.FreelancerPackage
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.content.ContextCompat
import com.example.myapplication.ApiClient
import com.example.myapplication.ApiService
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Freelancer
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONObject
import retrofit2.Response
import android.media.MediaPlayer

class HomePage : AppCompatActivity() {
    private lateinit var mediaPlayer: MediaPlayer
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_page)
        SocketManager.initSocket("http://192.168.1.20:5000/freelancer")
        SocketManager.connect()
        val sharedPref = this?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val freelancerAccountJson = sharedPref?.getString("freelancer_account", null)
        val scope = CoroutineScope(Dispatchers.Main)
        val gson = Gson()
        val freelancer = freelancerAccountJson?.let {
            gson.fromJson(it, Freelancer::class.java)
        }
        if (freelancer != null) {
            val jsonObject = JSONObject()
            jsonObject.put("Name", freelancer.name)
            jsonObject.put("_id", freelancer.id)
            SocketManager.emit("newUserConnected", jsonObject)
        }
        fun updateNotifications(freelancerr: Freelancer?) {
            val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav_bar)
            bottomNav?.let { nav ->
                val badge = nav.getOrCreateBadge(R.id.nav_Notifs)
                val unreadNotificationsCount = freelancerr?.notifications?.count { !it.readStatus } ?: 0
                val notifsMenuItem = bottomNav.menu.findItem(R.id.nav_Notifs)
                if (unreadNotificationsCount > 0) {
                    mediaPlayer = MediaPlayer.create(this@HomePage, R.raw.notificationsound)
                    mediaPlayer.start()
                    notifsMenuItem.icon = ContextCompat.getDrawable(this, R.drawable.notiicon1)
                    badge.number = unreadNotificationsCount
                    badge.isVisible = true

                } else {
                    notifsMenuItem.icon = ContextCompat.getDrawable(this, R.drawable.notiicon)
                    badge.isVisible = false
                }
            }
        }
        scope.launch {
            val freelancerId = ApiService.SendRequest(freelancer!!.id)
            val response : Response<ApiService.FreelancerResponse> = ApiClient.apiService.refreshFreelancerProfileHomePage(freelancerId)
            if (response.isSuccessful && response.body() != null) {
                val freelancerAccount = response.body()
                if (freelancerAccount?.error.equals(null) && freelancerAccount?.emailError.equals(null)){
                    val gson = Gson()
                    val freelancerAccountJson = gson.toJson(freelancerAccount?.freelancerAccount)
                    val sharedPref = getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
                    if (sharedPref != null) {
                        with(sharedPref.edit()) {
                            putString("freelancer_account", freelancerAccountJson)
                            apply()
                        }
                        updateNotifications(freelancerAccount!!.freelancerAccount)
                    }
                }
            }
        }
        SocketManager.on("NotificationRefresh" ) {args ->
            val jsonObject = JSONObject(args[0].toString())
            val idFromSocket = jsonObject.getString("freelancerId")
            if (idFromSocket === freelancer!!.id || idFromSocket.equals(freelancer!!.id)){
                scope.launch {
                    val response : Response<ApiService.FreelancerResponse> = ApiClient.apiService.refreshFreelancerProfile()
                    if (response.isSuccessful && response.body() != null) {
                        val freelancerAccount = response.body()

                        if (freelancerAccount?.error.equals(null) && freelancerAccount?.emailError.equals(null)){
                            val gson = Gson()
                            val freelancerAccountJson = gson.toJson(freelancerAccount?.freelancerAccount)
                            val sharedPref = getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)

                            if (sharedPref != null) {
                                with(sharedPref.edit()) {
                                    putString("freelancer_account", freelancerAccountJson)
                                    apply()
                                }
                                updateNotifications(freelancerAccount!!.freelancerAccount)
                            }
                        }
                    }
                }
            }
        }
        if (savedInstanceState == null) {
            val firstFragment = BrowsePage()
            firstFragment.arguments = intent.extras
            supportFragmentManager.beginTransaction()
                .add(R.id.Home_Container, firstFragment).commit()
        }
        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav_bar)
        bottomNav.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_browse -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, BrowsePage())
                        .commit()
                    true
                }

                R.id.nav_inbox -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, inboxFragment())
                        .commit()
                    true
                }
                R.id.nav_Notifs -> {
                    val FaccountJson = sharedPref?.getString("freelancer_account", null)
                    val FData = FaccountJson?.let {
                        gson.fromJson(it, Freelancer::class.java)
                    }
                    val unreadNotificationsCountt = FData?.notifications?.count { !it.readStatus } ?: 0
                    if (unreadNotificationsCountt !== 0 ){
                        scope.launch {
                             val response = ApiClient.apiService.cleanNotifications()
                        }
                    }
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, NotificationsFragment())
                        .commit()
                    true
                }
                R.id.nav_profile -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.Home_Container, ProfilePage())
                        .commit()
                    true
                }
                R.id.nav_settings -> {
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