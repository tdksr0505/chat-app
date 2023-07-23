'use client'
import React, { useEffect, useState } from 'react'
import LoginView from '../components/loginView'
import RoomView from '../components/roomView'

const page: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  return (
    <div>{isLogin ? <RoomView /> : <LoginView setIsLogin={setIsLogin} />}</div>
  )
}
export default page
