'use client'
import React, { createContext } from 'react'
import { io } from 'socket.io-client'

const socket = io('ws://localhost:3016')
export const SocketContext = createContext(socket)
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
