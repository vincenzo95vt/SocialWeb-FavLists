import React from 'react'
import "./HeaderComponent.CSS"
import { useNavigate } from 'react-router-dom'


const HeaderComponent = () => {
  
  const navigate = useNavigate()
  
  return (
    <div className='header'>
      <img src="/file.png" alt="" />
      <input type="text" />
      <div className='container-opt'>
        <span onClick={() => navigate("/index")}>Index</span>
        <span onClick={() => navigate("/profile")}>Profile</span>
        <span onClick={() => navigate("/aroundMe")}>Friends</span>
      </div>
    </div>
  )
}

export default HeaderComponent
