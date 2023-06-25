'use client'
import React, { useEffect, useState, useContext } from 'react'
import { ChatData } from '../types'
import { SocketContext } from '../context/socketContext'
import { PlayerListContext } from '../context/playerListContext'
import { S2C_COMMAND } from '@/constants'

type gameViewProps = {}

const gameView: React.FC<gameViewProps> = () => {
  const [chatData, setChatData] = useState<ChatData[]>([])
  const socket = useContext(SocketContext)
  const { playerList, setPlayerList } = useContext(PlayerListContext)

  useEffect(() => {
    socket.on(S2C_COMMAND.PLAYER_LIST, (arg: string[]) => {
      setPlayerList(arg)
    })
  }, [])
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col p-2">
      <div className="p-4  text-center rounded shadow-lg h-4/5 w-[900px] max-w-full flex flex-col bg-[#f4edff]">
        {/* 上半部 */}
        <div className="h-2/3 flex flex-auto pb-1">
          {/* 畫布區 */}
          <div className="w-3/4 h-full pr-2 pb-2 ">
            <div className="bg-white w-full h-full"></div>
          </div>
          {/* 玩家列表 */}
          <div className="flex-auto h-full border-l-2 border-slate-500 text-left pl-2 overflow-auto">
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

        {/* 下半部 */}
        <div className="h-1/3 border-t-2 border-slate-500 pt-1  flex flex-col">
          <div className="  border-blue-500 flex-auto overflow-auto">
            {chatData.map((data, idx) => {
              return (
                <div className="flex" key={idx}>
                  <div className="text-slate-500">{data.player}：</div>
                  <div className="text-slate-800">{data.msg}</div>
                </div>
              )
            })}
          </div>
          <input
            type="text"
            placeholder="輸入答案或對話"
            className="rounded outline-0 p-2 shadow-md border-2 border-blue-500 w-full mt-1"
          />
        </div>
      </div>
    </div>
  )
}
export default gameView
