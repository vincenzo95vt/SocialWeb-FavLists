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
import UserListsComponent from '../UserListsComponent/UserListsComponent'
import CardComponent from '../CardComponent/CardComponent'

const IndexComponent = ({section, path}) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [followRequests, setFollowRequests] = useState(undefined)
    const [reloadFollowRequest, setReloadFollowRequest] = useState(false)
    const [usersList, setUsersList] = useState(undefined)
    const navigate = useNavigate()
    
    const postFromReducer = useSelector((state) => state.infoReducer.post)
    const isTokenValid = (token) => {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decodedToken.exp > currentTime
      } catch (error) {
        return false
      }
    }
    const listFollowerOrFollowing = useSelector((state)=> state.profileInfoReducer.listUser)
    useEffect(() => {
      setUsersList(listFollowerOrFollowing)
    },[listFollowerOrFollowing])

    
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
    console.log(postFromReducer)
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
                          path === "following" ?
                          (
                            <UserListsComponent usersList={usersList} path={"Following"}/>
                          )
                          :
                          (
                            path === "followers" ?
                            (
                              <UserListsComponent usersList={usersList} path={"Followers"}/>
                            )
                            :
                            (
                              path === "post" ?
                              (
                                <CardComponent postFromReducer={postFromReducer}/>
                              )
                              :
                              (
                                <ProfileInfoComponent section={"profile"} path={path}/>
                              )
                            )
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
