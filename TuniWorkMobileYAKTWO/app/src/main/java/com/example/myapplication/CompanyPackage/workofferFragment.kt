package com.example.myapplication.CompanyPackage

import android.annotation.SuppressLint
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

class workofferFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
        }
    }

    @SuppressLint("MissingInflatedId")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_workoffer_company, container, false)

        // Get the arguments from the fragment
        val title = arguments?.getString(ARG_TITLE)
        val description = arguments?.getString(ARG_DESCRIPTION)
        val idPubJob = arguments?.getString(ARG_IDPUBJOB)
        val deleteButton: Button = view.findViewById(R.id.deleteButton)
        deleteButton.setOnClickListener { onDeleteButtonClick() }
        //val taskTable = arguments?.getStringArrayList(ARG_TASK_TABLE)?.toList()
        //val workSpeciality = arguments?.getStringArrayList(ARG_WORK_SPECIALITY)?.toList()

        // Display the title in the fragment
        val titleTextView = view.findViewById<TextView>(R.id.Title)
        val descriptionTextView = view.findViewById<TextView>(R.id.Description)
        val idPubJobTextView = view.findViewById<TextView>(R.id.idPubJob)
        titleTextView.setText("Title = "+title.toString())
        descriptionTextView.setText("Description = "+description.toString())
        idPubJobTextView.setText("pub job id = "+idPubJob.toString())


        return view
    }

    private fun onDeleteButtonClick() {
        val idPubJob = arguments?.getString(ARG_IDPUBJOB)

        if (idPubJob != null) {
            // Make the DELETE request to delete the public job offer
            deletePublicJobOffer(idPubJob)
        } else {
            // Handle the case where idPubJob is null
            Log.e("workofferFragment", "idPubJob is null")
        }
    }

    private fun deletePublicJobOffer(idPubJob: String) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                withContext(Dispatchers.IO) {
                    val response = ApiClient.apiService.cancelPublicJobOfferMob(idPubJob)
                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful) {
                            // Handle successful deletion, e.g., navigate back to the previous screen
                            requireActivity().supportFragmentManager.popBackStack()
                        } else {
                            // Handle unsuccessful response
                            Log.e("workofferFragment", "Unsuccessful delete response")
                        }
                    }
                }
            } catch (e: Exception) {
                Log.e("workofferFragment", "Delete API call failed", e)
                // Handle the exception, e.g., show an error message
            }
        }
    }




    companion object {
        private const val ARG_TITLE = "title"
        private const val ARG_DESCRIPTION = "description"
        private const val ARG_IDPUBJOB = "idPubJob"
        //private const val ARG_TASK_TABLE = "taskTable"
        //private const val ARG_WORK_SPECIALITY = "workSpeciality"


        fun newInstance(title: String, description: String, idPubJob: String): workofferFragment {
            val fragment = workofferFragment()
            val args = Bundle()
            args.putString(ARG_TITLE, title)
            args.putString(ARG_DESCRIPTION, description)
            args.putString(ARG_IDPUBJOB,idPubJob )
            fragment.arguments = args
            return fragment
        }
    }
}