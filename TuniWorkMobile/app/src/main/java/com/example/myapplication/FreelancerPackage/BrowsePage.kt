package com.example.myapplication.FreelancerPackage

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.ApiClient
import com.example.myapplication.ApiService
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Freelancer
import com.example.myapplication.freelancerAdapters.workofferAdapter
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [BrowsePage.newInstance] factory method to
 * create an instance of this fragment.
 */
class BrowsePage : Fragment() {
    lateinit var recyle: RecyclerView;
    lateinit var myadapter : workofferAdapter;
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_browse_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        recyle = view.findViewById(R.id.RecycleView)
        recyle.layoutManager=LinearLayoutManager(requireContext());

        val sharedPref = activity?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val freelancerAccountJson = sharedPref?.getString("freelancer_account", null)
        Log.i("Success", "Response: ${freelancerAccountJson}")
        val gson = Gson()
        val freelancer = freelancerAccountJson?.let {
            gson.fromJson(it, Freelancer::class.java)
        }
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val freelancerId = ApiService.SendRequest(freelancer!!.id)
                val response : Response<ApiService.MatchingPublicWorkOffersResponse> = ApiClient.apiService.getAll(freelancerId)
                if (response.isSuccessful && response.body() != null) {
                    Log.i("HOPEFULLY",response.body().toString())
                    val matchingJobOffers = response.body()!!.matchingJobOffers
                    myadapter = workofferAdapter(matchingJobOffers);
                    recyle.adapter=myadapter
                    myadapter.onItemClick = { position ->
                        val title = matchingJobOffers[position].title // Replace with the actual title variable
                        val description = matchingJobOffers[position].description
                        val taskTable = matchingJobOffers[position].taskTable
                        // Create a new instance of the workOfferFragment
                        val fragment = workOfferFragment.newInstance(title.toString(),description.toString())

                        // Get the FragmentManager and begin a transaction
                        val fragmentManager = requireActivity().supportFragmentManager
                        val transaction = fragmentManager.beginTransaction()

                        // Replace the current fragment with the new fragment
                        transaction.replace(R.id.Home_Container, fragment)

                        // Add the transaction to the back stack so the user can navigate back
                        transaction.addToBackStack(null)

                        // Commit the transaction
                        transaction.commit()
                    }
                }
            } catch (e: Exception) {
                Log.e("Error", "API call failed", e)
                // Handle the exception, e.g., show an error message
            }

        }
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment BrowsePage.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            BrowsePage().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}