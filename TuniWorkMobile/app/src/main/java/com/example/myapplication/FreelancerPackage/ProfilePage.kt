package com.example.myapplication.FreelancerPackage

import android.content.Context
import android.os.Bundle
import android.provider.ContactsContract.CommonDataKinds.Email
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Freelancer
import com.google.gson.Gson
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

lateinit var Name : TextView;
lateinit var Surname : TextView;
lateinit var Email : TextView
lateinit var PhoneNumber : TextView
class ProfilePage : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null
    private var name : TextView? = null;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        name = view?.findViewById(R.id.Name) ?: null
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(

        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_profile_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val sharedPref = activity?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val freelancerAccountJson = sharedPref?.getString("freelancer_account", null)
        val gson = Gson()
        val freelancer = freelancerAccountJson?.let {
            gson.fromJson(it, Freelancer::class.java)
        }
        val imageUrl = freelancer?.profilePicture.toString()
        val imageView: ImageView = view.findViewById(R.id.imageView)
        Picasso.get()
            .load(imageUrl)
            .into(imageView, object : Callback {
                override fun onSuccess() {
                }

                override fun onError(e: Exception?) {
                    e?.printStackTrace()
                }
            })
        Name = view.findViewById(R.id.Name)
        Name.setText( "Name = " + freelancer?.name.toString())
        Surname = view.findViewById(R.id.Surname)
        Surname.setText("Surname = " + freelancer?.surname.toString())
        Email = view.findViewById(R.id.Email)
        Email.setText("Email = " + freelancer?.email.toString())
        PhoneNumber = view.findViewById(R.id.PhoneNumber)
        PhoneNumber.setText("PhoneNumber = " + freelancer?.phoneNumber.toString())
        SocketManager.initSocket("http://192.168.1.20:5000/freelancer")
        SocketManager.connect()
        SocketManager.emit("getConnectedFreelancers")
        SocketManager.on("connectedFreelancersCount") {args ->
            val count = args[0] as Int
            val countTextView = view.findViewById<TextView>(R.id.Count)
            countTextView.setText("Connected Users = "+count.toString())
        }
        SocketManager.on("userDisconnectedMobile") {args ->
            val count = args[0] as Int
            val countTextView = view.findViewById<TextView>(R.id.Count)
            countTextView.setText("Connected Users = "+ count.toString())
        }
        SocketManager.on("userConnectedMobile") { args ->
            val count = args[0] as Int
            val countTextView = view.findViewById<TextView>(R.id.Count)
            countTextView.setText("Connected Users = "+ count.toString())
        }
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