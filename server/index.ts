import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from '../src/constants'
const WSS_PORT = 3005

const io = new Server(WSS_PORT, {
  cors: {
    origin: '*',
  },
})
const playerList: string[] = []
io.on('connection', (socket) => {
  socket.on(C2S_COMMAND.USER_JOIN, (arg) => {
    if (playerList.includes(arg)) {
      //檢查是否有同名玩家
      socket.emit(S2C_COMMAND.LOGIN, { isLogin: false, msg: '已有重複暱稱!' })
      return
    }

    playerList.push(arg)
    socket.emit(S2C_COMMAND.LOGIN, {
      isLogin: true,
      playerList,
      msg: '登入成功',
    })
    socket.broadcast.emit(S2C_COMMAND.PLAYER_LIST, playerList)
    console.log('現在玩家', playerList)
  })
})
