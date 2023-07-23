'use client'
import React, { createContext, useState } from 'react'

const DEFAULT_COLOR = '#FF0000'
const defaultValue = {
  currentColor: DEFAULT_COLOR,
  setCurrentColor: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
}
export const DrawContext = createContext(defaultValue)
export const DrawProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentColor, setCurrentColor] = useState<string>(DEFAULT_COLOR)
  const providerValue = {
    currentColor,
    setCurrentColor,
  }
  return (
    <DrawContext.Provider value={providerValue}>
      {children}
    </DrawContext.Provider>
  )
}
