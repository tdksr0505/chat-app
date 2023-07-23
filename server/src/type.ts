export type UserData = {
  id: string
  userName: string
}

type Point = {
  x: number
  y: number
}

/**
 * S2C 玩家資料
 */
export type S2C_UserList = {
  userList: UserData[]
}

/**
 * S2C 聊天資料
 */
export type S2C_ChatData = {
  userName: string
  msg: string
  timeStamp: number
}

/**
 * S2C 登入資料
 */
export type S2C_Login = {
  isLogin: boolean
  userList?: UserData[]
  msg?: string
  drawRecord?: C2S_DrawLine[]
}

/**
 * S2C 繪畫資料
 */
export type S2C_DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

/**
 * C2S 聊天資料
 */
export type C2S_ChatData = {
  msg: string
}
/**
 * C2S 玩家加入資料
 */
export type C2S_JoinData = {
  userName: string
}

/**
 * C2S 聊天資料
 */
export type C2S_DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}
