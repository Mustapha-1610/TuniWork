package com.example.myapplication.FreelancerPackage

import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter

object SocketManager { // This declares SocketManager as a Singleton
    private var socket: Socket? = null

    fun initSocket(url: String) {
        socket = IO.socket(url)
    }

    fun connect() {
        socket?.connect()
    }

    fun disconnect() {
        socket?.disconnect()
    }

    fun emit(event: String, vararg args: Any?) {
        socket?.emit(event, *args)
    }

    fun on(event: String, listener: Emitter.Listener) {
        socket?.on(event, listener)
    }

    // ... other methods for socket events and data handling
}