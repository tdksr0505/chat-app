import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from '../src/constants'
import { Socket } from 'socket.io'
const WSS_PORT = 3005

const io = new Server(WSS_PORT, {
  cors: {
    origin: '*',
  },
})

const SECOND_PER_ROUND = 10 //一回合秒數
const MIN_PLAYER = 2 //遊戲開始最低人數
const playerMap = new Map<string, string>()
let currentPainter = 0 //目前畫者index
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

    //檢查是否可開始遊戲
    if (canStartGame()) {
      startGame(socket)
    }
  })

  // 玩家對話
  socket.on(C2S_COMMAND.SEND_MSG, (arg) => {
    let player = playerMap.get(socket.id)
    sendAll(socket, S2C_COMMAND.SEND_MSG, { player, msg: arg })
  })

  // 繪畫
  socket.on(C2S_COMMAND.DRAW, (arg) => {
    socket.broadcast.emit(S2C_COMMAND.DRAW, arg)
  })
})

const getPlayerName = (socketId: string) => {
  return playerMap.get(socketId)
}
const canStartGame = () => {
  return playerMap.size >= MIN_PLAYER
}
const startGame = (socket: any) => {
  const iterator = playerMap.keys()
  let socketId = iterator.next().value
  let painter = getPlayerName(socketId)
  sendAll(socket, S2C_COMMAND.NEW_ROUND, {
    countDown: SECOND_PER_ROUND,
    painter,
    topic: '蘋果',
  })
}

const sendAll = (socket: any, ev: string, arg: any) => {
  socket.emit(ev, arg)
  socket.broadcast.emit(ev, arg)
}
