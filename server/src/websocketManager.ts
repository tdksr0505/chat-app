import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from './type'
import Handler from './handler'
import {
  C2S_JoinData,
  C2S_ChatData,
  C2S_DrawLine,
  S2C_UserList,
  S2C_ChatData,
  S2C_Login,
  S2C_DrawLine,
} from './type'

const WSS_PORT = 3016

class WebsocketManager {
  private io: Server
  private handler: Handler
  constructor() {
    console.log('WebsocketManager Init... ')
    this.io = new Server(WSS_PORT, {
      cors: {
        origin: '*',
      },
    })
    this.handler = new Handler(this)
    this.init()
  }

  private init() {
    this.io.on('connection', (socket) => {
      //斷線
      socket.on('disconnect', () => {
        console.log('[C2S]disconnect', socket.id)
        this.handler.handleDisconnect(socket.id)
      })

      // 加入
      socket.on(C2S_COMMAND.USER_JOIN, (data: C2S_JoinData) => {
        console.log('[C2S]USER_JOIN', data)
        this.handler.handleUserJoin(socket.id, data)
      })

      // 對話
      socket.on(C2S_COMMAND.SEND_MSG, (data: C2S_ChatData) => {
        console.log('[C2S]SEND_MSG', data)
        this.handler.handleSendMsg(socket.id, data.msg)
      })

      // 繪畫
      socket.on(C2S_COMMAND.DRAW, (data: C2S_DrawLine) => {
        console.log('[C2S]SEND_MSG', data)
        this.handler.handleDrawLine(socket.id, data)
      })

      // 清除白板
      socket.on(C2S_COMMAND.CLEAR, () => {
        console.log('[C2S]CLEAR')
        this.handler.handleClaer(socket.id)
      })
    })
  }

  public sendLogin(socketId: string, data: S2C_Login) {
    console.log('[S2C]LOGIN', data)
    this.sendData(S2C_COMMAND.LOGIN, [socketId], data)
  }

  public sendUserList(socketIds: string[], data: S2C_UserList) {
    console.log('[S2C]User_LIST', data)
    this.sendData(S2C_COMMAND.USER_LIST, socketIds, data)
  }

  public sendMsg(socketIds: string[], data: S2C_ChatData) {
    console.log('[S2C]SEND_MSG', data)
    this.sendData(S2C_COMMAND.SEND_MSG, socketIds, data)
  }

  public sendDrawLine(socketIds: string[], data: S2C_DrawLine) {
    console.log('[S2C]DRAW', data)
    this.sendData(S2C_COMMAND.DRAW, socketIds, data)
  }

  public sendClear(socketIds: string[]) {
    console.log('[S2C]CLEAR')
    this.sendData(S2C_COMMAND.CLEAR, socketIds)
  }

  private sendData(event: string, socketIds: string[], data?: any) {
    console.log(`[S2C] ids:${socketIds} data:${data}`)
    socketIds.forEach((socketId) => {
      this.io.to(socketId).emit(event, data)
    })
  }
}

export default WebsocketManager
