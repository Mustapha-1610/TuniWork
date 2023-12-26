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
import com.example.myapplication.companyAdapters.FreelancerAdapter
import com.example.myapplication.companyAdapters.JobOfferAdapter
import com.example.myapplication.dataClasses.Company
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"
class TalentFreelancer : Fragment() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var freelancerAdapter: FreelancerAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_talent_freelancer, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        recyclerView = view.findViewById(R.id.freelancersRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        val sharedPref = activity?.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val companyAccountJson = sharedPref?.getString("company_account", null)
        val gson = Gson()
        val company = gson.fromJson(companyAccountJson, Company::class.java)
        if (company != null) {
            val scope = CoroutineScope(Dispatchers.Main)

            scope.launch {
                try {
                    withContext(Dispatchers.IO) {
                        val response: Response<ApiService.FreelancerResponseTalent> =
                            ApiClient.apiService.getAllFreelancers()
                        withContext(Dispatchers.Main) {
                            if (response.isSuccessful) {
                                val freelancerResponse = response.body()
                                if (freelancerResponse != null && freelancerResponse.freelancers != null) {
                                    // Filter freelancers by the company's work title
                                    val matchingFreelancers =
                                        freelancerResponse.freelancers.filter { freelancer ->
                                            freelancer.WorkTitle?.workTitleText == company.workTitle?.workTitleText
                                        }

                                    if (matchingFreelancers.isNotEmpty()) {
                                        freelancerAdapter = FreelancerAdapter(matchingFreelancers)
                                        recyclerView.adapter = freelancerAdapter
                                        // Set up click listener here
                                        freelancerAdapter.onItemClick = { position ->
                                            val selectedFreelancer = matchingFreelancers[position]
                                            val name = selectedFreelancer.Name
                                            val surname = selectedFreelancer.Surname
                                            val id = selectedFreelancer._id

                                            // Create a new instance of the workOfferFragment
                                            val fragment = FreelancerDetails.newInstance(name.toString(), surname.toString(), id.toString())

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
                                        Log.d("TalentFreelancerFragment", "No matching freelancers found")
                                    }
                                } else {
                                    Log.e(
                                        "TalentFreelancerFragment",
                                        "Response body is null or freelancers is null"
                                    )
                                }
                            } else {
                                Log.e(
                                    "TalentFreelancerFragment",
                                    "Unsuccessful response: ${response.code()}"
                                )
                            }
                        }
                    }
                } catch (e: Exception) {
                    Log.e("TalentFreelancerFragment", "API call failed", e)
                }
            }
        } else {
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