'use client'
import React, { createContext, useState } from 'react'

const DEFAULT_COLOR = '#FF0000'
const defaultValue = {
  currentColor: DEFAULT_COLOR,
  setCurrentColor: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  drawRecord: [] as DrawLine[],
  setDrawRecord: (() => {}) as React.Dispatch<React.SetStateAction<DrawLine[]>>,
}
export const DrawContext = createContext(defaultValue)
export const DrawProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentColor, setCurrentColor] = useState<string>(DEFAULT_COLOR)
  const [drawRecord, setDrawRecord] = useState<DrawLine[]>([])
  const providerValue = {
    currentColor,
    setCurrentColor,
    drawRecord,
    setDrawRecord,
  }
  return (
    <DrawContext.Provider value={providerValue}>
      {children}
    </DrawContext.Provider>
  )
}
