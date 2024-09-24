import React from 'react'
import "./HeaderComponent.CSS"


const HeaderComponent = () => {
  return (
    <div className='header'>
      <img src="/file.png" alt="" />
      <input type="text" />
      <div className='container-opt'>
        <span>Index</span>
        <span>Profile</span>
        <span>Friends</span>
      </div>
    </div>
  )
}

export default HeaderComponent
