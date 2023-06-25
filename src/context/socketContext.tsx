'use client'
import React, { createContext, useRef } from 'react'
import { Socket, io } from 'socket.io-client'

const socket = io('ws://localhost:3005')

export const SocketContext = createContext(socket)
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
