'use client'
import React, { useState, useEffect, useRef } from 'react'
import { C2S_COMMAND, S2C_COMMAND } from '../constants'

const DEFAULT_WIDTH = 3
const DEFAULT_COLOR = '#FF0000'
const Canvas: React.FC<CanvasProps> = ({ socket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasBoxRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [lineColor, setLineColor] = useState<string>(DEFAULT_COLOR)
  const [lineWidth, setLineWidth] = useState<number>(DEFAULT_WIDTH)
  const prevPoint = useRef<null | Point>(null)
  const getCanvasPos = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    let x = 0
    let y = 0
    let rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }
    return { x, y }
  }

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
    prevPoint.current = null
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return
    let currentPoint = getCanvasPos(event)
    drawLine({ prevPoint: prevPoint.current, currentPoint })
    socket.emit(C2S_COMMAND.DRAW, {
      prevPoint: prevPoint.current,
      currentPoint,
    })
    prevPoint.current = { x: currentPoint.x, y: currentPoint.y }
  }

  const drawLine = ({ prevPoint, currentPoint }: DrawLine) => {
    let ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x: currentX, y: currentY } = currentPoint
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, lineWidth / 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  const handleClear = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    if (canvasRef.current) {
      canvasRef.current.width = canvasBoxRef.current?.offsetWidth || 0
      canvasRef.current.height = canvasBoxRef.current?.offsetHeight || 0
    }

    socket.on(S2C_COMMAND.DRAW, (points: DrawLine) => {
      drawLine(points)
    })

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="w-full h-full border border-slate-300" ref={canvasBoxRef}>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      ></canvas>
      <div
        onClick={handleClear}
        className="absolute top-3 left-3 flex justify-center items-center border-2 border-slate-600 rounded-full w-10 h-10 opacity-50 cursor-pointer hover:opacity-100"
      >
        <img src="/img/eraser.png" className="w-[22px] select-none" />
      </div>
    </div>
  )
}
export default Canvas
