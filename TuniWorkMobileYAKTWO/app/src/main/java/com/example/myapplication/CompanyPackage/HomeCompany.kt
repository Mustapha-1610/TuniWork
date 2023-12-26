package com.example.myapplication.CompanyPackage

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
import com.example.myapplication.companyAdapters.JobOfferAdapter
import com.example.myapplication.companyAdapters.PrivateJobOfferAdapter
import com.example.myapplication.dataClasses.Company
import com.example.myapplication.dataClasses.PrivateJobOffer
import com.example.myapplication.dataClasses.PublicJobOffer
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"


class HomeCompany : Fragment() {
    private lateinit var publicJobRecyclerView: RecyclerView
    private lateinit var privateJobRecyclerView: RecyclerView
    private lateinit var jobOfferAdapter: JobOfferAdapter
    private lateinit var privateJobOfferAdapter: PrivateJobOfferAdapter
    private val scope = CoroutineScope(Dispatchers.Main)

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_home_company, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        publicJobRecyclerView = view.findViewById(R.id.jobOffersRecyclerView)
        publicJobRecyclerView.layoutManager = LinearLayoutManager(requireContext())

        privateJobRecyclerView = view.findViewById(R.id.prvjobOffersRecyclerView)
        privateJobRecyclerView.layoutManager = LinearLayoutManager(requireContext())

        val sharedPref = activity?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val companyAccountJson = sharedPref?.getString("company_account", null)
        val gson = Gson()
        val company = gson.fromJson(companyAccountJson, Company::class.java)

        if (company != null) {
            scope.launch {
                try {
                    val companyId = ApiService.SendRequestCompany(company.id)
                    withContext(Dispatchers.IO) {
                        val response: Response<List<PublicJobOffer>> =
                            ApiClient.apiService.getAllPublicJobOffersMob(companyId)
                        withContext(Dispatchers.Main) {

                            if (response.isSuccessful && response.body() != null) {
                                val jobOffers = response.body()!!
                                jobOfferAdapter = JobOfferAdapter(jobOffers)
                                publicJobRecyclerView.adapter = jobOfferAdapter

                                // Set up click listener here
                                jobOfferAdapter.onItemClick = { position ->
                                    val title = jobOffers[position].title
                                    val description = jobOffers[position].description
                                    val idPubJob = jobOffers[position].idPubJob
                                    //val taskTable = jobOffers[position].taskTable

                                    // Create a new instance of the workOfferFragment
                                    val fragment = workofferFragment.newInstance(
                                        title.toString(),
                                        description.toString(),
                                        idPubJob.toString()
                                    )

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
                            } else {
                                // Handle unsuccessful response
                                Log.e("HomeCompany", "Unsuccessful response")
                            }
                        }
                    }

                    // Get private job offers
                    val privateJobResponse = withContext(Dispatchers.IO) {
                        ApiClient.apiService.getAllPrivateJobOffersMob(companyId)
                    }

                    withContext(Dispatchers.Main) {
                        if (privateJobResponse.isSuccessful && privateJobResponse.body() != null) {
                            val privateJobOffers = privateJobResponse.body()!!
                            privateJobOfferAdapter = PrivateJobOfferAdapter(privateJobOffers)
                            privateJobRecyclerView.adapter = privateJobOfferAdapter


                                // Set up click listener here
                                privateJobOfferAdapter.onItemClick = { position ->
                                    val title = privateJobOffers[position].title
                                    val description = privateJobOffers[position].description
                                    val idPrvJob = privateJobOffers[position].idPrvJob
                                    //val taskTable = jobOffers[position].taskTable

                                    // Create a new instance of the workOfferFragment
                                    val fragment = prvworkofferFragment.newInstance(
                                        title.toString(),
                                        description.toString(),
                                        idPrvJob.toString()
                                    )

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

                        } else {
                            // Handle unsuccessful response for private job offers
                            Log.e("HomeCompany", "Unsuccessful response for private job offers")
                        }
                    }

                } catch (e: Exception) {
                    Log.e("HomeCompany", "API call failed", e)
                    // Handle the exception, e.g., show an error message
                }
            }
        } else {
            // Handle null company case
            Log.e("HomeCompany", "Company is null")
        }
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            HomeCompany().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}