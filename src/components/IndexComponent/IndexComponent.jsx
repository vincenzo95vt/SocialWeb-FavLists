import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import "./IndexComponent.css"
import InfoComponent from '../InfoComponent/InfoComponent'
import { useNavigate } from 'react-router-dom'
import ProfileInfoComponent from '../ProfileInfoComponent/ProfileInfoComponent'
import FavouriteListComponent from '../ProfileInfoComponent/FavouriteListComponent/FavouriteListComponent'

const IndexComponent = ({section, path}) => {
    const [userData, setUserData] = useState(undefined)
    const token = localStorage.getItem("token")
    const userDataFromReducer = useSelector((state) => state.loginReducer.userData)
    const navigate = useNavigate()
    useEffect(() => {
      if(!token){
        alert("Token expired, you will be redirected to login")
        navigate("/login")
      }
    },[token])

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
                {
                  section === "index" ?
                  (
                    <InfoComponent/>
                  )
                  :
                  (
                    section === "profile" && path !== "favouriteLists" ?
                    (
                      <ProfileInfoComponent userData={userData}/>
                    )
                    :
                    (
                      path === "favouriteLists" &&
                      (
                        <FavouriteListComponent/>
                      )
                    )
                  )
                }
            </>
        ) 
        : null
      }
    </div>
  )
}

export default IndexComponent
