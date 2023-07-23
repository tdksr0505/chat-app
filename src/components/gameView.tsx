'use client'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { SocketContext } from '../context/socketContext'
import { PlayerListContext } from '../context/playerListContext'
import { C2S_COMMAND, S2C_COMMAND } from '@/constants'
import Canvas from './canvas'

type gameViewProps = {}

const gameView: React.FC<gameViewProps> = () => {
  const [chatData, setChatData] = useState<ChatData[]>([])
  const [msg, setMsg] = useState<string>('')
  const socket = useContext(SocketContext)
  const { playerList, setPlayerList } = useContext(PlayerListContext)

  useEffect(() => {
    socket.on(S2C_COMMAND.PLAYER_LIST, (arg: string[]) => {
      setPlayerList(arg)
    })
    socket.on(S2C_COMMAND.SEND_MSG, (arg: ChatData) => {
      setChatData((pre) => [...pre, arg])
    })
    socket.on(S2C_COMMAND.NEW_ROUND, (arg: NewRoundData) => {
      console.log(arg)
    })
  }, [])
  const handleSendMsg = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!msg) {
        return
      }
      socket.emit(C2S_COMMAND.SEND_MSG, msg)
      setMsg('')
    }
  }
  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col p-2">
      <div className="p-4  text-center rounded shadow-lg h-[600px] w-[700px]  flex flex-col bg-white">
        {/* 上半部 */}
        <div className="h-2/3 flex flex-auto pb-1">
          {/* 畫布區 */}
          <div className="w-3/4 h-full pr-2 pb-2 ">
            <Canvas socket={socket} />
          </div>
          {/* 玩家列表 */}
          <div className="flex-auto h-full border-l-2 border-slate-500">
            <div className="text-center text-slate-500 font-bold">PLAYERS</div>
            <div className="text-left pl-2 overflow-auto">
              {playerList.map((player) => {
                return (
                  <div
                    key={player}
                    className="text-slate-500 py-1 border-b border-slate-400 last:border-0 flex items-center"
                  >
                    <img src="/img/player.png" className="w-[30px]" />
                    <div>{player}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 下半部 */}
        <div className="h-1/3 border-t-2 border-slate-500 pt-1  flex flex-col">
          <div className="  border-blue-500 flex-auto overflow-auto">
            {chatData.map((data) => {
              let key = `${data.player}-${data.msg}`
              return (
                <div className="flex " key={key}>
                  <div className="text-slate-500">{data.player}：</div>
                  <div className="text-slate-800">{data.msg}</div>
                </div>
              )
            })}
          </div>
          <input
            type="text"
            onKeyDown={handleSendMsg}
            onChange={handleMsgChange}
            value={msg}
            placeholder="輸入答案或對話"
            className="rounded outline-0 p-2 shadow-md border-2 border-blue-500 w-full mt-1"
          />
        </div>
      </div>
    </div>
  )
}
export default gameView
