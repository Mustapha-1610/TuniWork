package com.example.myapplication.freelancerAdapters

import PublicJobOffer
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R

class workofferAdapter (private val data: List<PublicJobOffer>): RecyclerView.Adapter<workofferAdapter.MyViewHolder>() {
    private var selectedPosition= RecyclerView.NO_POSITION;
    var onItemClick: ((Int) -> Unit)? = null
    fun onItemClick(position: Int) {
        this.selectedPosition=position;
        notifyDataSetChanged()
    }

    inner class MyViewHolder(itemview: View):RecyclerView.ViewHolder(itemview), View.OnClickListener{
        val title: TextView =itemview.findViewById(R.id.Title);
        val description : TextView = itemview.findViewById(R.id.Description)
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(bindingAdapterPosition)
            }
        }
        override fun onClick(v: View?) {
            onItemClick(bindingAdapterPosition);
            println("selectedPosition : " +selectedPosition);
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): workofferAdapter.MyViewHolder {
        val layout= LayoutInflater.from(parent.context).inflate(R.layout.workofferbody,parent,false);
        return  MyViewHolder(layout);
    }
    override fun onBindViewHolder(holder: workofferAdapter.MyViewHolder, position: Int) {
        val item=data[position];
        holder.title.text=item.title;
        holder.description.text=item.description;
    }

    override fun getItemCount(): Int {
        return  data.size;
    }

    fun GetSelectedItem():Int{
        return this.selectedPosition;
    }
}