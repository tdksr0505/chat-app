type LoginInfo = {
  isLogin: boolean
  playerList?: string[]
  msg?: string
}

type ChatData = {
  player: string
  msg: string
}

type CanvasProps = {
  socket: Socket
}

type Point = {
  x: number
  y: number
}

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
}
