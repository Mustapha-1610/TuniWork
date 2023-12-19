package com.example.myapplication.FreelancerPackage

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.myapplication.R



/**
 * A simple [Fragment] subclass.
 * Use the [workOfferFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class workOfferFragment : Fragment() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {

        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_work_offer, container, false)

        // Get the arguments from the fragment
        val title = arguments?.getString(ARG_TITLE)
        val description = arguments?.getString(ARG_DESCRIPTION)
        val taskTable = arguments?.getStringArrayList(ARG_TASK_TABLE)?.toList()
        val workSpeciality = arguments?.getStringArrayList(ARG_WORK_SPECIALITY)?.toList()

        // Display the title in the fragment
        val titleTextView = view.findViewById<TextView>(R.id.Title)
        titleTextView.setText(title.toString())

        return view
    }

    companion object {
        private const val ARG_TITLE = "title"
        private const val ARG_DESCRIPTION = "description"
        private const val ARG_TASK_TABLE = "taskTable"
        private const val ARG_WORK_SPECIALITY = "workSpeciality"

        fun newInstance(title: String, description: String, taskTable: ArrayList<String>, workSpeciality: List<String>): workOfferFragment {
            val fragment = workOfferFragment()
            val args = Bundle()
            args.putString(ARG_TITLE, title)
            args.putString(ARG_DESCRIPTION, description)
            args.putStringArrayList(ARG_TASK_TABLE,taskTable)
             // Use putParcelableArrayList() for a list of Parcelable objects
            args.putStringArrayList(ARG_WORK_SPECIALITY, ArrayList(workSpeciality))
            fragment.arguments = args
            return fragment
        }
    }
}