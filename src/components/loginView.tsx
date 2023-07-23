'use client'
import React, { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../context/socketContext'
import { UserListContext } from '../context/userListContext'
import { DrawContext } from '../context/drawContext'
import { C2S_COMMAND, S2C_COMMAND } from '../constants'

type loginViewProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}
const loginView: React.FC<loginViewProps> = ({ setIsLogin }) => {
  const socket = useContext(SocketContext)
  const { setUserList } = useContext(UserListContext)
  const { setDrawRecord } = useContext(DrawContext)
  const [name, setName] = useState<string>('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name) {
      alert('暱稱不可為空白')

      return
    }
    socket.emit(C2S_COMMAND.USER_JOIN, { userName: name })
  }

  useEffect(() => {
    socket.on(S2C_COMMAND.LOGIN, (loginInfo: LoginInfo) => {
      if (loginInfo.isLogin) {
        console.log(`loginInfo`, loginInfo)
        setIsLogin(true)
        loginInfo.userList && setUserList(loginInfo.userList)
        loginInfo.drawRecord && setDrawRecord(loginInfo.drawRecord)
      } else {
        alert(loginInfo.msg)
      }
    })
  }, [])
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="p-10 bg-white text-center rounded shadow-lg">
        <div className="font-Fredericka text-blue-800 text-6xl mb-10 border-b-2 border-blue-300 pb-5">
          Draw & Chat
        </div>
        <form onSubmit={onFormSubmit}>
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
              type="submit"
              className="text-xl  rounded-md  w-4/5 py-2  text-white bg-blue-500 shadow-md shadow-blue-500/50 hover:bg-blue-600"
            >
              START
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default loginView
