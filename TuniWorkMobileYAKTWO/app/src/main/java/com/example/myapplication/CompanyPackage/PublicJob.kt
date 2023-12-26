package com.example.myapplication.CompanyPackage

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.myapplication.ApiClient
import com.example.myapplication.ApiService
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Company
import com.google.gson.Gson
import io.github.muddz.styleabletoast.StyleableToast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class PublicJob : AppCompatActivity() {
    @SuppressLint("SuspiciousIndentation")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_public_job_create)

        val createPublicJobButton: Button = findViewById(R.id.createPublicJob)

        // Retrieve the company information from shared preferences
        val sharedPref = getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val companyAccountJson = sharedPref.getString("company_account", null)
        val gson = Gson()
        val company = gson.fromJson(companyAccountJson, Company::class.java)

        // Set the company name and ID EditTexts
        findViewById<EditText>(R.id.CompanyName).setText(company?.CompanyName ?: "")
        findViewById<EditText>(R.id.CompanyId).setText(company?.id ?: "")

        val startTimeEditText: EditText = findViewById(R.id.StartTime)
        val deadLineEditText: EditText = findViewById(R.id.DeadLine)

        // Set up click listeners for date and time pickers
        startTimeEditText.setOnClickListener { showDateTimePicker(startTimeEditText) }
        deadLineEditText.setOnClickListener { showDateTimePicker(deadLineEditText) }

        createPublicJobButton.setOnClickListener {
            val title: String = findViewById<EditText>(R.id.Title).text.toString()
            val workTitle: String = findViewById<EditText>(R.id.WorkTitle).text.toString()
            val description: String = findViewById<EditText>(R.id.Description).text.toString()
            val experienceLevel: String = findViewById<EditText>(R.id.ExperienceLevel).text.toString()
            val fixedPrice: String = findViewById<EditText>(R.id.FixedPrice).text.toString()
            val workSpeciality: String = findViewById<EditText>(R.id.WorkSpeciality).text.toString()
            val note: String = findViewById<EditText>(R.id.Note).text.toString()

            if (title.isEmpty() || workTitle.isEmpty() || description.isEmpty() || experienceLevel.isEmpty() ||
                fixedPrice.isEmpty() || workSpeciality.isEmpty() || note.isEmpty()
            ) {
                StyleableToast.makeText(
                    this,
                    "Missing Inputs",
                    Toast.LENGTH_LONG,
                    R.style.ErrorToast
                ).show()
            } else {
                val scope = CoroutineScope(Dispatchers.Main)

                val payPerTask = ApiService.PayPerTask(experienceLevel, fixedPrice)

                val createPublicJobRequest = ApiService.CreatePublicJobRequest(
                    Title = title,
                    StartTime = startTimeEditText.text.toString(),
                    DeadLine = deadLineEditText.text.toString(),
                    WorkTitle = workTitle,
                    Description = description,
                    PayPerTask = payPerTask,
                    WorkSpeciality = workSpeciality,
                    Note = note,
                    CompanyName = company?.CompanyName ?: "",
                    CompanyId = company?.id ?: "",
                )

                scope.launch {
                    val response: Response<ApiService.CompanyResponse> =
                        ApiClient.apiService.createPublicJob(createPublicJobRequest)

                    if (response.isSuccessful && response.body() != null) {
                        val res = response.body()
                        if (!res?.error.isNullOrBlank()) {
                            StyleableToast.makeText(
                                this@PublicJob,
                                res?.error,
                                Toast.LENGTH_LONG,
                                R.style.ErrorToast
                            ).show()
                        } else if (!res?.success.isNullOrBlank()) {
                            StyleableToast.makeText(
                                this@PublicJob,
                                res?.success,
                                Toast.LENGTH_LONG,
                                R.style.SuccessToast
                            ).show()
                        }
                    }
                }
            }
        }
    }

    // Function to show the date and time picker
    private fun showDateTimePicker(editText: EditText) {
        val calendar = Calendar.getInstance()
        val datePickerDialog = DatePickerDialog(
            this,
            { _, year, month, dayOfMonth ->
                calendar.set(Calendar.YEAR, year)
                calendar.set(Calendar.MONTH, month)
                calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)
                showTimePicker(calendar, editText)
            },
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
        )
        datePickerDialog.datePicker.minDate = System.currentTimeMillis()
        datePickerDialog.show()
    }

    // Function to show the time picker
    private fun showTimePicker(calendar: Calendar, editText: EditText) {
        val timePickerDialog = TimePickerDialog(
            this,
            { _, hourOfDay, minute ->
                calendar.set(Calendar.HOUR_OF_DAY, hourOfDay)
                calendar.set(Calendar.MINUTE, minute)
                updateDateTimeEditText(editText, calendar)
            },
            calendar.get(Calendar.HOUR_OF_DAY),
            calendar.get(Calendar.MINUTE),
            false
        )
        timePickerDialog.show()
    }

    // Function to update the date and time in the EditText
    private fun updateDateTimeEditText(editText: EditText, calendar: Calendar) {
        val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
        editText.setText(dateFormat.format(calendar.time))
    }
}