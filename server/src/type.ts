export type PlayerData = {
  id: string
  userName: string
}

/**
 * S2C 玩家資料
 */
export type S2C_PlayerList = {
  playerList: PlayerData[]
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
  playerList?: PlayerData[]
  msg?: string
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
