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
    playerList.push(arg)
    socket.emit(S2C_COMMAND.USER_JOIN, { isLogin: true, playerList })
    socket.broadcast.emit(S2C_COMMAND.PLAYER_LIST, playerList)
    console.log('現在玩家', playerList)
  })
})
