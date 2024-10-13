import React, { useEffect, useState } from 'react'
import "./ProfileInfoComponent.css"
import UserPostComponent from './UserPostComponent/UserPostComponent'
import { getPostsLists } from '../../core/services/postServices/postServices'
import { useDispatch, useSelector } from 'react-redux'
import { showFavouritePosts, showListData } from './ProfileInfoAction'
import { setLoading } from '../IndexComponent/InfoAction'
import { useNavigate } from 'react-router-dom'


const ProfileInfoComponent = ({section, path}) => {
    const [hidden, setHidden] = useState(true)
    const [userInfo, setUserInfo] = useState(undefined)
    const [editProfileOpt, setEditProfileOpt] = useState(undefined)
    const data = localStorage.getItem("userData")
    const dataParsed = JSON.parse(data)

    const userFoundFromReducer = useSelector((state) => state.userFoundReducer.userFound)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showListPosts = async (list) => {
        try {
            dispatch(setLoading(true))
            const data = await Promise.all(
                list.favouritePosts.map(id => getPostsLists(id))
            );
            dispatch(showFavouritePosts(data))
            dispatch(showListData(list))
            navigate(`/profile/favouriteList/${list._id}`)
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(setLoading(false))
        }
    };

    const handleEditProfile = () => {
        
    }

    useEffect(() => {
        if(section === "index" && path === "user"){
            setUserInfo(userFoundFromReducer)
        }else if(section === "profile" && path === "favouriteLists"){
            setUserInfo(dataParsed)
            setEditProfileOpt(true)
        }
    }, [section, path])
    console.log(userInfo)
    return (
    <div className='profile-user-card'>
        {
            userInfo === undefined ? 
            (
                <div><span>No data to show</span></div>
            )
            :
            (
                <>
                    {
                        editProfileOpt === true ?
                        (
                            <>
                                <div className='imgprofile-names-info'>
                                    <img src={userInfo.imgProfile} alt="" />
                                    <div className='name-info'>
                                        <div className='name-last-name'>
                                            <span>{userInfo.name} {userInfo.lastName} </span>
                                            {
                                                userInfo.privacy === "private" ?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                                                )
                                                :
                                                (
                                                    userInfo.privacy === "public" &&
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M17,8H7V7a5,5,0,0,1,9.375-2.422,1,1,0,0,0,1.749-.971A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5.006,5.006,0,0,0,17,8Zm3,11a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                                                    )
                                                )
                                            }
                                        </div>
                                        <span className='userName'>{userInfo.userName}</span>
                                    </div>
                                    <div className='follows-container'>
                                        <div className='followers'>
                                            <span className='name-info'>Followers</span>
                                            <span className='info'>{userInfo.followers.length}</span>
                                        </div>
                                        <div className='following'>
                                            <span className='name-info'>Following</span>
                                            <span className='info'>{userInfo.following.length}</span>
                                        </div>
                                    </div>
                                    <div className='container-edit-prof'>
                                        <svg className='editProf' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="45"><path d="M9,12c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm4.27,7.48c-.813,.813-1.27,1.915-1.27,3.065v1.455h1.455c1.15,0,2.252-.457,3.065-1.27l6.807-6.807c.897-.897,.897-2.353,0-3.25-.897-.897-2.353-.897-3.25,0l-6.807,6.807Zm-3.27,3.065c0-1.692,.659-3.283,1.855-4.479l2.376-2.376c-1.476-1.06-3.279-1.691-5.231-1.691C4.038,14,0,18.038,0,23c0,.552,.448,1,1,1H10v-1.455Z"/></svg>
                                    </div>
                                </div>                
                                <div className='myLists-container'>
                                    <span>My favourites lists: </span>
                                    <span>{userInfo.myLists.length}</span>
                                    {
                                        userInfo.myLists.length > 0 &&
                                        (
                                            <button onClick={() => hidden ? setHidden(false) : setHidden(true)}>Show lists</button>
                                        )
                                    }
                                </div>
                                <div className={`list-to-show ${hidden ? "hidden" : "flex"}`} >
                                    {
                                        userInfo.myLists.map((list, idx) => (
                                            <div onClick={() => showListPosts(list)} key={idx} className='container-name-list'>
                                                <span>{list.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <UserPostComponent userInfo={userInfo}/>
                            </>
                        )
                        :
                        (
                            <>
                                <div className='imgprofile-names-info'>
                                    <img src={userInfo.imgProfile} alt="" />
                                    <div className='name-info'>
                                        <div className='name-last-name'>
                                            <span>{userInfo.name} {userInfo.lastName} </span>
                                            {
                                                userInfo.privacy === "private" ?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                                                )
                                                :
                                                (
                                                    userInfo.privacy === "public" &&
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M17,8H7V7a5,5,0,0,1,9.375-2.422,1,1,0,0,0,1.749-.971A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5.006,5.006,0,0,0,17,8Zm3,11a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                                                    )
                                                )
                                            }
                                        </div>
                                        <span className='userName'>{userInfo.userName}</span>
                                    </div>
                                    <div className='follows-container'>
                                        <div className='followers'>
                                            <span className='name-info'>Followers</span>
                                            <span className='info'>{userInfo.followers.length}</span>
                                        </div>
                                        <div className='following'>
                                            <span className='name-info'>Following</span>
                                            <span className='info'>{userInfo.following.length}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    userInfo.privacy === "private" ?
                                    (
                                        <div className='private-zone'>
                                            <span>
                                            This user is private
                                            </span>
                                            <svg className='chain' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            <div className='myLists-container'>
                                                <span>My favourites lists: </span>
                                                <span>{userInfo.myLists.length}</span>
                                                {
                                                    userInfo.myLists.length > 0 &&
                                                    (
                                                        <button onClick={() => hidden ? setHidden(false) : setHidden(true)}>Show lists</button>
                                                    )
                                                }
                                            </div>
                                            <div className={`list-to-show ${hidden ? "hidden" : "flex"}`} >
                                                {
                                                    userInfo.myLists.map((list, idx) => (
                                                        <div onClick={() => showListPosts(list)} key={idx} className='container-name-list'>
                                                            <span>{list.name}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <UserPostComponent userInfo={userInfo}/>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </>     
            )
        }
    </div>
  )
}

export default ProfileInfoComponent
