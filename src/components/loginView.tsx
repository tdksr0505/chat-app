'use client'
import React, { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../context/socketContext'
import { PlayerListContext } from '../context/playerListContext'
import { C2S_COMMAND, S2C_COMMAND } from '../constants'
import { LoginInfo } from '../types'
type loginViewProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}
const loginView: React.FC<loginViewProps> = ({ setIsLogin }) => {
  const socket = useContext(SocketContext)
  const { setPlayerList } = useContext(PlayerListContext)
  const [name, setName] = useState<string>('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleStart = () => {
    if (!name) {
      alert('暱稱不可為空白')
      return
    }
    socket.emit(C2S_COMMAND.USER_JOIN, name)
  }

  useEffect(() => {
    socket.on(S2C_COMMAND.LOGIN, (arg: LoginInfo) => {
      if (arg.isLogin) {
        setIsLogin(true)
        arg.playerList && setPlayerList(arg.playerList)
      } else {
        alert(arg.msg)
      }
    })
  }, [])
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="p-10 bg-white text-center rounded shadow-lg">
        <div className="font-Fredericka text-blue-800 text-6xl mb-10 border-b-2 border-blue-300 pb-5">
          Draw & Guess
        </div>
        <div className="mb-10">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="請輸入暱稱"
            className=" rounded outline-0 p-2 shadow-md border-2 border-blue-500 w-4/5"
          />
        </div>
        <div>
          <button
            onClick={handleStart}
            className="text-xl  rounded-md  w-4/5 py-2  text-white bg-blue-500 shadow-md shadow-blue-500/50 hover:bg-blue-600"
          >
            START
          </button>
        </div>
      </div>
    </div>
  )
}
export default loginView
