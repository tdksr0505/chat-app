import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from '../src/constants'
const WSS_PORT = 3005

const io = new Server(WSS_PORT, {
  cors: {
    origin: '*',
  },
})

const playerMap = new Map<string, string>()

io.on('connection', (socket) => {
  console.log('connection', socket.id)
  // console.log(socket.id)
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
    playerMap.delete(socket.id)
    socket.broadcast.emit(S2C_COMMAND.PLAYER_LIST, [...playerMap.values()])
    console.log('玩家列表', playerMap)
  })

  // 玩家加入
  socket.on(C2S_COMMAND.USER_JOIN, (arg) => {
    console.log(`join`, socket.id, arg)
    if ([...playerMap.values()].includes(arg)) {
      //檢查是否有同名玩家
      socket.emit(S2C_COMMAND.LOGIN, { isLogin: false, msg: '已有重複暱稱!' })
      return
    }

    playerMap.set(socket.id, arg)
    let playerList = [...playerMap.values()]
    socket.emit(S2C_COMMAND.LOGIN, {
      isLogin: true,
      playerList,
      msg: '登入成功',
    })
    socket.broadcast.emit(S2C_COMMAND.PLAYER_LIST, playerList)
    console.log('玩家列表', playerMap)
  })

  // 玩家對話
  socket.on(C2S_COMMAND.SEND_MSG, (arg) => {
    let player = playerMap.get(socket.id)
    socket.emit(S2C_COMMAND.SEND_MSG, { player, msg: arg })
    socket.broadcast.emit(S2C_COMMAND.SEND_MSG, { player, msg: arg })
  })

  // DRAW
  socket.on(C2S_COMMAND.DRAW, (arg) => {
    socket.broadcast.emit(S2C_COMMAND.DRAW, arg)
  })
})
