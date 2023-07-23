'use client'
import React, { createContext, useState } from 'react'

const defaultValue = {
  playerList: [] as PlayerData[],
  setPlayerList: (() => {}) as React.Dispatch<
    React.SetStateAction<PlayerData[]>
  >,
}
export const PlayerListContext = createContext(defaultValue)
export const PlayerListProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [playerList, setPlayerList] = useState<PlayerData[]>([])
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
