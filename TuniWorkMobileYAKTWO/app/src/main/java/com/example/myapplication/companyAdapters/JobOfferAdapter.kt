package com.example.myapplication.companyAdapters

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R
import com.example.myapplication.dataClasses.PublicJobOffer


class JobOfferAdapter (private val data: List<PublicJobOffer>): RecyclerView.Adapter<JobOfferAdapter.MyViewHolder>() {

    private var selectedPosition= RecyclerView.NO_POSITION;
    var onItemClick: ((Int) -> Unit)? = null


    fun onItemClick(position: Int) {
        this.selectedPosition=position;
        notifyDataSetChanged()
    }

    inner class MyViewHolder(itemview: View):RecyclerView.ViewHolder(itemview), View.OnClickListener{
        val title: TextView =itemview.findViewById(R.id.Title);
        val description : TextView = itemview.findViewById(R.id.Description)
        //val idPubJob: TextView = itemview.findViewById(R.id.idPubJob)
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(bindingAdapterPosition)
            }
        }

        override fun onClick(v: View?) {
            onItemClick(bindingAdapterPosition);
            println("selectedPosition : " +selectedPosition);
            notifyItemChanged(selectedPosition);
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): JobOfferAdapter.MyViewHolder {
        val layout= LayoutInflater.from(parent.context).inflate(R.layout.item_job_offer,parent,false);
        return  MyViewHolder(layout);
    }

    override fun onBindViewHolder(holder: JobOfferAdapter.MyViewHolder, position: Int) {
        val item=data[position];
        holder.title.text=item.title;
        holder.description.text=item.description;
        //holder.idPubJob.text=item.idPubJob;
    }

    override fun getItemCount(): Int {
        return  data.size;
    }

    fun GetSelectedItem():Int{
        return this.selectedPosition;
    }


}