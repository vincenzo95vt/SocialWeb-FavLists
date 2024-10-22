import React, { useEffect, useState } from 'react'
import "./HeaderComponent.CSS"
import { useNavigate } from 'react-router-dom'
import { findUserByName } from '../../core/services/userServices/userServices'
import { showDataUserFound } from './UserFoundAction'
import { useDispatch } from 'react-redux'
import { acceptFollowRequest } from '../../core/services/followRequestServices/followRequestServices'


const HeaderComponent = ({logoutFunction, followRequests, reloadData}) => {
  const [usersData, setUsersData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [profileOpt, setProfileOpt] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [fqInfo, setFqInfo] = useState(undefined)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const findUser = async (e) => {
    const query = e.target.value
    if(query === ""){
      setUsersData(undefined)
      setError(undefined)
      return
    }else if(query){
      const users = await findUserByName(query)
      if(users.status === 200){
        setUsersData(users.data)
        setError(undefined)
      }else if(users.status === 404){
        setError(users.message)
        setUsersData(undefined)
      }else if(users === undefined){
        setUsersData(undefined)
        setError(undefined)
      }
    }
  }


  const sendUserFoundData = (userData) => {
    dispatch(showDataUserFound(userData))
    navigate(`/index/user/${userData.userId}`)
    setUsersData(undefined)
  }
  const handleGoToMyProfile = () => {
    navigate("/profile")
    setProfileOpt(false)
  }

  const handleFollowRequest = async (fqId) => {
    const data = await acceptFollowRequest(fqId)
    console.log(data.data.info.status)
    setFqInfo(data.data.info.status)
  }

  useEffect(() => {
    if(fqInfo === "accepted" || fqInfo === "rejected"){
      reloadData()
      
    }
  },[fqInfo])
  return (
    <div className='header'>
      <img src="/file.png" alt="" />
      <input type="text" onChange={(e) => findUser(e)} />
      {
        usersData ? 
        (
          <div className='container-find-users'>
            {
              usersData.map((user, idx) => (
                <div onClick={() => sendUserFoundData(user)} key={idx} className='container-user-found'>
                  <img src={user.imgProfile} alt="" />
                  <span >{user.userName}</span>
                </div>
              ))
                
            }
          </div>
        )
        :
        (
          error &&
          (
            <div className='error'><span>{error}</span></div>
          )
          
        )
      }
      <div className='container-opt'>
        {
          Array.isArray(followRequests) ?
          (
            followRequests.find(req => req.status === "pending") ? 
            (
              <svg onClick={() => {notifications ? setNotifications(false) : (setNotifications(true), profileOpt ? setProfileOpt(false) : null)}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="m20,8c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-6c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm3.272,14.247l-.005-.019s0,0,0-.001h0l-1.573-6.473c-.538.158-1.105.247-1.694.247-.104,0-.205-.01-.308-.016l1.637,6.735c.002.007.007.012.008.02h-.004c.082.308.021.615-.169.866-.192.255-.476.395-.796.395H3.493c-.305,0-.589-.137-.778-.371-.192-.24-.264-.548-.207-.812l2.352-9.117c.746-3.356,3.682-5.7,7.14-5.7.773,0,1.523.132,2.232.361.188-.661.484-1.275.872-1.821-.979-.348-2.025-.539-3.104-.539C7.598,0,3.859,2.988,2.916,7.233L.564,16.352c-.197.89.018,1.811.591,2.528.573.712,1.426,1.12,2.338,1.12h3.608c.465,2.279,2.484,4,4.899,4s4.434-1.721,4.899-4h3.47c.947,0,1.817-.433,2.39-1.186.556-.733.739-1.66.514-2.55-.001-.006,0-.011,0-.017Zm-11.272,5.753c-1.302,0-2.402-.839-2.816-2h5.631c-.414,1.161-1.514,2-2.816,2Z"/>
            </svg>
            )
            :
            (
              <svg onClick={() => {notifications ? setNotifications(false) : (setNotifications(true), profileOpt ? setProfileOpt(false) : null)}} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z"/></svg>
            )
          )
          :
          (
            <svg onClick={() => {notifications ? setNotifications(false) : (setNotifications(true), profileOpt ? setProfileOpt(false) : null)}} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z"/></svg>
          )
        }
        <svg onClick={() => navigate("/index")} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M18.5,24H5.5c-3.032,0-5.5-2.468-5.5-5.5V9.886c0-1.83,.906-3.534,2.424-4.559L8.924,.941c1.867-1.262,4.284-1.262,6.153,0l6.499,4.386c1.518,1.024,2.424,2.729,2.424,4.559v8.614c0,3.032-2.468,5.5-5.5,5.5ZM12,2.997c-.486,0-.974,.144-1.397,.431L4.102,7.813c-.689,.466-1.102,1.24-1.102,2.072v8.614c0,1.379,1.121,2.5,2.5,2.5h13c1.379,0,2.5-1.121,2.5-2.5V9.886c0-.832-.412-1.606-1.102-2.072L13.398,3.428c-.425-.287-.912-.431-1.398-.431Z"/></svg>
        <svg onClick={() => {profileOpt ? setProfileOpt(false) : (setProfileOpt(true), notifications ? setNotifications(false) : null)}} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
        <div className={`notifications-container ${notifications ? "show": "hidden"}`}>
          {
            Array.isArray(followRequests) ?
            (
              followRequests.map((req, idx) => (
                req.status === "pending" && 
                (
                  <div key={idx} className='requester-info' >
                    <img src={req.requester.imgProfile}/>
                    <div className='name-and-action'>
                      <span className='name'>{req.requester.userName}</span>
                      <span>has requested to follow you</span>
                    </div>
                    <div className='buttons'>
                      <button onClick={() => handleFollowRequest(req._id)}>Accept</button>
                      <button onClick={() => console.log(req._id)} style={{backgroundColor:"red", color:"white"}}>Reject</button>
                    </div>
                  </div>
                )
              ))
            )
            :
            (
              <span>{followRequests}</span>
            )
            
          }
        </div>
        <div className={`profile-opt ${profileOpt ? "show" : "hidden"}`}>
          <ul>
            <li onClick={() => handleGoToMyProfile()}>Go to my profile</li>
            <li onClick={() => logoutFunction()}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
