import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./MainComponent.css"
import ImagesComponent from './ImagesComponent/ImagesComponent'
const MainComponent = () => {
  
  const navigate = useNavigate()


  return (
    <div className='main-component'>
      <div className='cnt-img-sliders'>
        <ImagesComponent/>
        <div>
          <span onClick={() => navigate("/login")} className='login'>Log in</span>
          <span onClick={() => navigate("/signup")} className='signup'>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export default MainComponent
