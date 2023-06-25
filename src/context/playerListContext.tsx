'use client'
import React, { createContext, useState } from 'react'

const defaultValue = {
  playerList: [] as string[],
  setPlayerList: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>,
}
export const PlayerListContext = createContext(defaultValue)
export const PlayerListProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [playerList, setPlayerList] = useState<string[]>([])
  const providerValue = {
    playerList,
    setPlayerList,
  }
  return (
    <PlayerListContext.Provider value={providerValue}>
      {children}
    </PlayerListContext.Provider>
  )
}
