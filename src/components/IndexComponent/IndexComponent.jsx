import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import "./IndexComponent.css"
import InfoComponent from '../InfoComponent/InfoComponent'
import { getDataFromBack } from '../../core/services/postServices/postServices'
import { showData } from './InfoAction'

const IndexComponent = () => {
    const [userData, setUserData] = useState(undefined)
    const token = localStorage.getItem("token")
    const userDataFromReducer = useSelector((state) => state.loginReducer.userData)

    useEffect(()=> {
        userDataFromReducer ? setUserData(userDataFromReducer) : null
    },[userDataFromReducer])
    return (
    <div className='index-component'>
      {
        token ? 
        (
            <>
                <HeaderComponent/>
                <InfoComponent/>
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
