/**
 * S2C 玩家資料
 */
type PlayerData = {
  id: string
  userName: string
}

type LoginInfo = {
  isLogin: boolean
  playerList?: PlayerData[]
  msg?: string
}

type ChatData = {
  userName: string
  msg: string
  timeStamp: number
}

type NewRoundData = {
  countDown: number
  painterId: string
  topic: string
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

/**
 * S2C 玩家列表資料
 */
type PlayerList = {
  playerList: PlayerData[]
}

/**
 * C2S 玩家加入資料
 */
type JoinData = {
  userName: string
}
