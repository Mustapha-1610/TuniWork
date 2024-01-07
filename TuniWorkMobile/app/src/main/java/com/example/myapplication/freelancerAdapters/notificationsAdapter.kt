package com.example.myapplication.freelancerAdapters

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R
import com.example.myapplication.dataClasses.Notification
import java.text.SimpleDateFormat
import java.util.Locale

class notificationsAdapter (private val data: List<Notification>): RecyclerView.Adapter<notificationsAdapter.MyViewHolder>() {
    private var selectedPosition= RecyclerView.NO_POSITION;
    var onItemClick: ((Int) -> Unit)? = null
    fun onItemClick(position: Int) {
        this.selectedPosition=position;
        notifyDataSetChanged()
    }

    inner class MyViewHolder(itemview: View):RecyclerView.ViewHolder(itemview), View.OnClickListener{
        val notificationsMessage : TextView = itemview.findViewById(R.id.NotificationsMessage)
        val notificationsDate : TextView = itemview.findViewById(R.id.NotificationDate)
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
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): notificationsAdapter.MyViewHolder {
        val layout= LayoutInflater.from(parent.context).inflate(R.layout.notificationsbody,parent,false);
        return  MyViewHolder(layout);
    }
    override fun onBindViewHolder(holder: notificationsAdapter.MyViewHolder, position: Int) {
        val item=data[position];
        Log.i("date" , item.toString())
        val formattedDate = SimpleDateFormat("EEEE, MMM dd, yyyy", Locale.getDefault()).format(item.senderInformation.creationDate)
        holder.notificationsMessage.text=item.notificationMessage;
        holder.notificationsDate.text = formattedDate;
    }

    override fun getItemCount(): Int {
        return  data.size;
    }

    fun GetSelectedItem():Int{
        return this.selectedPosition;
    }
}