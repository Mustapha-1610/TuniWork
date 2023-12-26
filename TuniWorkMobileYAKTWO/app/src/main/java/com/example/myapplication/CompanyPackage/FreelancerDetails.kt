package com.example.myapplication.CompanyPackage

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import com.example.myapplication.R


class FreelancerDetails : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_freelancer_details, container, false)

        // Display the title in the fragment
        val name = arguments?.getString(ARG_NAME)
        val surname = arguments?.getString(ARG_SURNAME)
        val id = arguments?.getString(ARG_ID)

        val nameTextView = view.findViewById<TextView>(R.id.FreelancerName)
        val surnameTextView = view.findViewById<TextView>(R.id.FreelancerSurname)
        val idTextView = view.findViewById<TextView>(R.id.FreelancerId)
        nameTextView.text = "freelancer name = $name"
        surnameTextView.text = "freelancer surname = $surname"
        idTextView.text = "freelancer id = $id"

        val createPrivateJobButton: Button = view.findViewById(R.id.createPrivateJob)

        createPrivateJobButton.setOnClickListener {
            // Continue with the code to start the PrivateJob activity
            val intent = Intent(activity, PrivateJob::class.java)
            intent.putExtra("freelancerId", id)
            startActivity(intent)
        }

        return view
    }



    companion object {
        private const val ARG_NAME = "name"
        private const val ARG_SURNAME = "surname"
        private const val ARG_ID = "id"

        fun newInstance(name: String, surname: String, id: String): FreelancerDetails {
            val fragment = FreelancerDetails()
            val args = Bundle()
            args.putString(ARG_NAME, name)
            args.putString(ARG_SURNAME, surname)
            args.putString(ARG_ID,id )
            fragment.arguments = args
            return fragment
        }
    }
}