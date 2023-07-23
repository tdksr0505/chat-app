'use client'
import React, { createContext, useState } from 'react'

const defaultValue = {
  userList: [] as UserData[],
  setUserList: (() => {}) as React.Dispatch<React.SetStateAction<UserData[]>>,
}
export const UserListContext = createContext(defaultValue)
export const UserListProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userList, setUserList] = useState<UserData[]>([])
  const providerValue = {
    userList,
    setUserList,
  }
  return (
    <UserListContext.Provider value={providerValue}>
      {children}
    </UserListContext.Provider>
  )
}
