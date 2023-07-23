'use client'
import React, { useState, useEffect, useContext } from 'react'
import { DrawContext } from '../context/drawContext'

const COLORS: string[] = [
  '#FF0000', // 紅色
  '#FF7F00', // 橙色
  '#00FF00', // 綠色
  '#0000FF', // 藍色
  '#4B0082', // 靛色
  '#9400D3', // 紫色
]
const Palette: React.FC<PaletteProps> = ({ socket }) => {
  const { currentColor, setCurrentColor } = useContext(DrawContext)
  const handleChangeColor = (color: string) => {
    setCurrentColor(color)
  }

  return (
    <div className="w-full h-full ">
      <div className="flex">
        {COLORS.map((color) => {
          return (
            <div className="mr-3" key={color}>
              <div
                className={`${
                  currentColor === color ? 'scale-125' : ''
                } w-5 h-5 rounded-full cursor-pointer  hover:scale-125`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  handleChangeColor(color)
                }}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Palette
