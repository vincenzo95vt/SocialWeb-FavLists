import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./MainComponent.css"
import { useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
const MainComponent = () => {
  const [userData, setUserData] = useState(undefined)

  const userDataFromReducer = useSelector((state) => state.loginReducer.userData)


  const navigate = useNavigate()

  useEffect(() => {
    console.log(userDataFromReducer)
    setUserData(userDataFromReducer)
  }, [userDataFromReducer])

  return (
    <div className='main-component'>
      {
        !userData ? 
        (
          <>
           <span onClick={() => navigate("/login")} className='login'>Log in</span>
           <span onClick={() => navigate("/signup")} className='signup'>Sign Up</span>
          </>
        )
        :
        (
          userData && 
          (
            <>
              <HeaderComponent/>
              <div className='user-data'></div>
            </>
            
          )
        )
      }
     
    </div>
  )
}

export default MainComponent
