package com.example.myapplication.freelancerAdapters

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.dataClasses.publicworkOffer

class workofferAdapter (private val data: ArrayList<publicworkOffer>): RecyclerView.Adapter<workofferAdapter.MyViewHolder>() {
    private var selectedPosition= RecyclerView.NO_POSITION;
    fun onItemClick(position: Int) {
        this.selectedPosition=position;
        notifyDataSetChanged()
    }

    inner class MyViewHolder(itemview: View):RecyclerView.ViewHolder(itemview), View.OnClickListener{
        val name: TextView =itemview.findViewById(R.id.name);
        val prenom: TextView =itemview.findViewById(R.id.prenom);
        val age: TextView =itemview.findViewById(R.id.age);
        init {
            itemview.setOnClickListener{
                onItemClick(bindingAdapterPosition);
            }
        }
        override fun onClick(v: View?) {
            onItemClick(bindingAdapterPosition);
            println("selectedPosition : " +selectedPosition);
            notifyItemChanged(selectedPosition);
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserAdapter.MyViewHolder {
        val layout= LayoutInflater.from(parent.context).inflate(R.layout.ligne,parent,false);
        return  MyViewHolder(layout);
    }
    override fun onBindViewHolder(holder: UserAdapter.MyViewHolder, position: Int) {
        val item=data[position];
        if(position==selectedPosition){
            holder.itemView.setBackgroundColor(Color.RED);
        }else{
            holder.itemView.setBackgroundColor(Color.TRANSPARENT);
        }
        holder.name.text=item.name;
        holder.prenom.text=item.prenom;
        holder.age.text=item.age.toString();
    }

    override fun getItemCount(): Int {
        return  data.size;
    }

    fun GetSelectedItem():Int{
        return this.selectedPosition;
    }
}