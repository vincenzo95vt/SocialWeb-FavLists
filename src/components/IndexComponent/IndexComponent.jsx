import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import "./IndexComponent.css"

const IndexComponent = () => {
    const [userData, setUserData] = useState(undefined)


    const userDataFromReducer = useSelector((state) => state.loginReducer.userData)

    useEffect(()=> {
        userDataFromReducer ? setUserData(userDataFromReducer) : null
    },[userDataFromReducer])
  
    return (
    <div className='index-component'>
      {
        userData ? 
        (
            <>
                <HeaderComponent/>
                <div className='index-container'>DATA</div>
            </>
        ) 
        :
        (
            <div>No data to show</div>
        )
      }
    </div>
  )
}

export default IndexComponent
