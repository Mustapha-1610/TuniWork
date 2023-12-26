package com.example.myapplication.companyAdapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.example.myapplication.R
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.ApiService
import com.example.myapplication.dataClasses.Freelancer
import com.squareup.picasso.Picasso

class FreelancerAdapter(private var freelancers: List<ApiService.Freelancer>) : RecyclerView.Adapter<FreelancerAdapter.MyViewHolder>() {

    private var selectedPosition = RecyclerView.NO_POSITION
    var onItemClick: ((Int) -> Unit)? = null

    fun onItemClick(position: Int) {
        this.selectedPosition = position
        notifyDataSetChanged()
    }

    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
        val name: TextView = itemView.findViewById(R.id.freelancerNameTextView)
        val surname: TextView = itemView.findViewById(R.id.freelancerSurnameTextView)
        val profileImage: ImageView = itemView.findViewById(R.id.freelancerImageView)
        val id : TextView = itemView.findViewById(R.id.freelancerIdTextView)
        val viewDetailsButton: Button = itemView.findViewById(R.id.viewDetailsButton)

        init {
            viewDetailsButton.setOnClickListener {
                onItemClick?.invoke(bindingAdapterPosition)
            }
        }

        override fun onClick(v: View?) {
            onItemClick(bindingAdapterPosition)
            notifyItemChanged(selectedPosition)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FreelancerAdapter.MyViewHolder {
        val layout = LayoutInflater.from(parent.context).inflate(R.layout.item_freelancer, parent, false)
        return MyViewHolder(layout)
    }

    override fun onBindViewHolder(holder: FreelancerAdapter.MyViewHolder, position: Int) {
        val freelancer = freelancers[position]
        holder.name.text = freelancer.Name
        holder.surname.text = freelancer.Surname
        holder.id.text= freelancer._id
        if (!freelancer.ProfilePicture.isNullOrEmpty()) {
            Picasso.get().load(freelancer.ProfilePicture).into(holder.profileImage)
        }
    }

    override fun getItemCount(): Int {
        return freelancers.size
    }

    fun GetSelectedItem(): Int {
        return this.selectedPosition
    }
}