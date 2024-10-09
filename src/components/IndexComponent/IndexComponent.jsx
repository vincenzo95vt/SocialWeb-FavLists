import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import "./IndexComponent.css"
import InfoComponent from '../InfoComponent/InfoComponent'
import { useNavigate } from 'react-router-dom'
import ProfileInfoComponent from '../ProfileInfoComponent/ProfileInfoComponent'
import FavouriteListComponent from '../ProfileInfoComponent/FavouriteListComponent/FavouriteListComponent'

const IndexComponent = ({section, path}) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
      if(!token){
        alert("Token expired, you will be redirected to login")
        navigate("/login")
      }
    },[token])
    return (
    <div className='index-component'>
      {
        token ? 
        (
            <> 
                <HeaderComponent/>
                {
                  section === "index" && path !== "user" ?
                  (
                    <InfoComponent/>
                  )
                  :
                  (
                    path === "user" ? 
                    (
                      <ProfileInfoComponent  path={"user"} section={"index"} />
                    )
                    :
                    (
                      section === "profile" && path !== "favouriteLists" ?
                    (
                      <ProfileInfoComponent section={"profile"} path={"favouriteLists"}/>
                    )
                    :
                    (
                      path === "favouriteLists" &&
                      (
                        <FavouriteListComponent/>
                      )
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
