import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./MainComponent.css"
const MainComponent = () => {
  
  const navigate = useNavigate()


  return (
    <div className='main-component'>
      <span onClick={() => navigate("/login")} className='login'>Log in</span>
      <span onClick={() => navigate("/signup")} className='signup'>Sign Up</span>
    </div>
  )
}

export default MainComponent
