'use client'
import React, { useEffect, useState } from 'react'
import LoginView from '../components/loginView'
import GameView from '../components/gameView'

const page: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  return (
    <div>{isLogin ? <GameView /> : <LoginView setIsLogin={setIsLogin} />}</div>
  )
}
export default page
