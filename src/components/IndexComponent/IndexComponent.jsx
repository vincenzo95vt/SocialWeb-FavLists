import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import "./IndexComponent.css"
import InfoComponent from '../InfoComponent/InfoComponent'
import { useNavigate } from 'react-router-dom'
import ProfileInfoComponent from '../ProfileInfoComponent/ProfileInfoComponent'
import FavouriteListComponent from '../ProfileInfoComponent/FavouriteListComponent/FavouriteListComponent'
import { jwtDecode } from 'jwt-decode'
import { handleExpiredToken } from '../../core/services/utils'
import { showFollowRequests } from '../../core/services/followRequestServices/followRequestServices'
import UpdateProfileComponent from '../UpdateProfileComponent/UpdateProfileComponent'

const IndexComponent = ({section, path}) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [followRequests, setFollowRequests] = useState(undefined)
    const [reloadFollowRequest, setReloadFollowRequest] = useState(false)
    const navigate = useNavigate()
    
    const isTokenValid = (token) => {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decodedToken.exp > currentTime
      } catch (error) {
        return false
      }
    }

    
    useEffect(() => {
      if(!token){
        navigate("/login")
      }else if (!isTokenValid(token)){
        handleExpiredToken()
      }
    },[token])

    const logoutFunction = () => {
      localStorage.removeItem("token")
      setToken(null)
    }
    useEffect(() => {
     const fetchFollowRequests = async () => {
        const data = await showFollowRequests()
        console.log("fetfollowrequest",data)
        if(data.message === "No follow requests found"){
          setFollowRequests(data.message)
        }else{
          setFollowRequests(data.followRequests)
        }
      }
      fetchFollowRequests()
    }, [reloadFollowRequest])

    const reloadData =  () => {
      setReloadFollowRequest(prev => !prev)
    }
    return (
    <div className='index-component'>
      {
        token ? 
        (
            <> 
                <HeaderComponent reloadData={reloadData} followRequests={followRequests} logoutFunction={logoutFunction}/>
                {
                  section === "index" ?
                  (
                     path !== "user" ? 
                     (
                       <InfoComponent/>
                     ) 
                     :
                     (
                      <ProfileInfoComponent  path={"user"} section={"index"} />
                     )
                  )
                  :
                  (
                    section === "profile" &&
                      (
                        path === "favouriteLists" ? 
                        (
                          <FavouriteListComponent/>
                        )
                        :
                        path === "update-prof" ? 
                        (
                          <UpdateProfileComponent/>
                        )
                        :
                        (
                          <ProfileInfoComponent section={"profile"} path={path}/>
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
