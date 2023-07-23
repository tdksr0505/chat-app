import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from '../../src/constants' // 之後要改成import server的constants
import Handler from './handler'
import {
  C2S_JoinData,
  C2S_ChatData,
  S2C_PlayerList,
  S2C_ChatData,
  S2C_Login,
} from './type'

const WSS_PORT = 3005

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

      // 加入遊戲
      socket.on(C2S_COMMAND.USER_JOIN, (data: C2S_JoinData) => {
        console.log('[C2S]USER_JOIN', data)
        this.handler.handleUserJoin(socket.id, data)
      })

      // 對話
      socket.on(C2S_COMMAND.SEND_MSG, (data: C2S_ChatData) => {
        console.log('[C2S]SEND_MSG', data)
        this.handler.handleSendMsg(socket.id, data.msg)
      })
    })
  }

  public sendLogin(socketId: string, data: S2C_Login) {
    this.sendData(S2C_COMMAND.LOGIN, [socketId], data)
  }

  public sendPlayerList(socketIds: string[], data: S2C_PlayerList) {
    this.sendData(S2C_COMMAND.PLAYER_LIST, socketIds, data)
  }

  public sendMsg(socketIds: string[], data: S2C_ChatData) {
    console.log('[S2C]SEND_MSG', data)
    this.sendData(S2C_COMMAND.SEND_MSG, socketIds, data)
  }

  private sendData(event: string, socketIds: string[], data: any) {
    console.log(`[S2C] ids:${socketIds} data:${data}`)
    socketIds.forEach((socketId) => {
      this.io.to(socketId).emit(event, data)
    })
  }
}

export default WebsocketManager
