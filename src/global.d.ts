type UserData = {
  id: string
  userName: string
}

type LoginInfo = {
  isLogin: boolean
  userList?: UserData[]
  msg?: string
}

type ChatData = {
  userName: string
  msg: string
  timeStamp: number
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

type UserList = {
  userList: UserData[]
}

type JoinData = {
  userName: string
}
