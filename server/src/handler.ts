import WebsocketManager from './websocketManager'
import { C2S_JoinData, PlayerData, C2S_DrawLine } from './type'
// key: socketId, value:userName

const SECOND_PER_ROUND = 10 //一回合秒數
const MIN_PLAYER = 2 //遊戲開始最低人數
class Handler {
  private websocketManager: WebsocketManager
  /**
   * 全部玩家資料
   */
  private playerList: PlayerData[] = []
  constructor(websocketManager: WebsocketManager) {
    this.websocketManager = websocketManager
  }

  public handleDisconnect(id: string) {
    this.playerList = this.playerList.filter((player) => {
      return player.id !== id
    })

    let allSocketIds = this.getAllSocketIds()
    this.websocketManager.sendPlayerList(allSocketIds, {
      playerList: this.playerList,
    })
    console.log('玩家列表', this.playerList)
  }
  public handleUserJoin(id: string, data: C2S_JoinData) {
    console.log(`join`, id, data.userName)
    if (this.checkSameName(data.userName)) {
      //檢查是否有同名玩家
      this.websocketManager.sendLogin(id, {
        isLogin: false,
        msg: '已有重複暱稱!',
      })
      return
    }

    let newPlayer = {
      id,
      userName: data.userName,
    }
    this.playerList.push(newPlayer)

    this.websocketManager.sendLogin(id, {
      isLogin: true,
      playerList: this.playerList,
      msg: '登入成功',
    })

    let otherSocketIds = this.getOtherSocketIds(id)

    this.websocketManager.sendPlayerList(otherSocketIds, {
      playerList: this.playerList,
    })
    console.log('玩家列表', this.playerList)

    //檢查是否可開始遊戲
    if (this.canStartGame()) {
      this.startGame()
    }
  }

  public handleSendMsg(id: string, msg: string) {
    let allSocketIds = this.getAllSocketIds()
    let userName = this.playerList.find((player) => {
      return player.id === id
    })?.userName
    if (userName) {
      let timeStamp = new Date().getTime()
      this.websocketManager.sendMsg(allSocketIds, {
        userName,
        msg,
        timeStamp,
      })
    }
  }

  public handleDrawLine(id: string, data: C2S_DrawLine) {
    let otherSocketIds = this.getOtherSocketIds(id)
    this.websocketManager.sendDrawLine(otherSocketIds, data)
  }
  private getAllSocketIds() {
    return this.playerList.map((player) => {
      return player.id
    })
  }

  private getOtherSocketIds(excludeId: string) {
    let otherSocketIds: string[] = []
    this.playerList.forEach((player) => {
      if (player.id !== excludeId) otherSocketIds.push(player.id)
    })
    return otherSocketIds
  }

  /**
   * 檢查是否有相同名稱玩家
   */
  private checkSameName(userName: string) {
    return this.playerList.find((player) => {
      return player.userName === userName
    })
  }

  /**
   * 檢查是否可以開始遊戲
   */
  private canStartGame = () => {
    return this.playerList.length >= MIN_PLAYER
  }
  private startGame = () => {
    let painterId = this.playerList[0].id
    let allSocketIds = this.getAllSocketIds()
    this.websocketManager.sendNewRound(allSocketIds, {
      countDown: SECOND_PER_ROUND,
      painterId,
      topic: '蘋果',
    })
  }
}

export default Handler
