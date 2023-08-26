export type UserData = {
  id: string
  userName: string
}

export const C2S_COMMAND = {
  USER_JOIN: 'USER_JOIN',
  SEND_MSG: 'SEND_MSG',
  DRAW: 'DRAW',
  CLEAR: 'CLEAR',
}

export const S2C_COMMAND = {
  LOGIN: 'LOGIN',
  OTHER_JOIN: 'OTHER_JOIN',
  USER_LIST: 'USER_LIST',
  SEND_MSG: 'SEND_MSG',
  DRAW: 'DRAW',
  CLEAR: 'CLEAR',
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
