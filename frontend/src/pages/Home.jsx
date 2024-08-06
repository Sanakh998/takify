import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Home() {
  const {user} = useContext(AuthContext)
  return (
    <div>Home{user.name}</div>
  )
}

export default Home