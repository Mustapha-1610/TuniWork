package com.example.myapplication.CompanyPackage

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import com.example.myapplication.ApiClient
import com.example.myapplication.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class prvworkofferFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_prvworkoffer_company, container, false)

        // Get the arguments from the fragment
        val title = arguments?.getString(ARG_TITLE)
        val description = arguments?.getString(ARG_DESCRIPTION)
        val idPrvJob = arguments?.getString(ARG_IDPRVJOB)
        val deleteButton: Button = view.findViewById(R.id.deleteButton)
        deleteButton.setOnClickListener { onDeleteButtonClick() }


        // Display the title in the fragment
        val titleTextView = view.findViewById<TextView>(R.id.Title)
        val descriptionTextView = view.findViewById<TextView>(R.id.Description)
        val idPrvJobTextView = view.findViewById<TextView>(R.id.idPrvJob)
        titleTextView.setText("Title = "+title.toString())
        descriptionTextView.setText("Description = "+description.toString())
        idPrvJobTextView.setText("private job id = "+idPrvJob.toString())


        return view
    }

    private fun onDeleteButtonClick() {
        val idPrvJob = arguments?.getString(ARG_IDPRVJOB)

        if (idPrvJob != null) {
            // Make the DELETE request to delete the public job offer
            deletePublicJobOffer(idPrvJob)
        } else {
            // Handle the case where idPubJob is null
            Log.e("prvworkofferFragment", "idPrvJob is null")
        }
    }

    private fun deletePublicJobOffer(idPrvJob: String) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                withContext(Dispatchers.IO) {
                    val response = ApiClient.apiService.cancelPrivateJobOfferMob(idPrvJob)
                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful) {
                            // Handle successful deletion, e.g., navigate back to the previous screen
                            requireActivity().supportFragmentManager.popBackStack()
                        } else {
                            // Handle unsuccessful response
                            Log.e("prvworkofferFragment", "Unsuccessful delete response")
                        }
                    }
                }
            } catch (e: Exception) {
                Log.e("prvworkofferFragment", "Delete API call failed", e)
                // Handle the exception, e.g., show an error message
            }
        }
    }




    companion object {
        private const val ARG_TITLE = "title"
        private const val ARG_DESCRIPTION = "description"
        private const val ARG_IDPRVJOB = "idPubJob"



        fun newInstance(title: String, description: String, idPrvJob: String): prvworkofferFragment {
            val fragment = prvworkofferFragment()
            val args = Bundle()
            args.putString(ARG_TITLE, title)
            args.putString(ARG_DESCRIPTION, description)
            args.putString(ARG_IDPRVJOB,idPrvJob )
            fragment.arguments = args
            return fragment
        }
    }
}