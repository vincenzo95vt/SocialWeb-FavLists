import React, { useState } from 'react'
import "./ProfileInfoComponent.css"
import UserPostComponent from './UserPostComponent/UserPostComponent'
import { getPostsLists } from '../../core/services/postServices/postServices'
import { useDispatch } from 'react-redux'
import { showFavouritePosts, showListData } from './ProfileInfoAction'
import { setLoading } from '../IndexComponent/InfoAction'
import { useNavigate } from 'react-router-dom'


const ProfileInfoComponent = () => {
    const [hidden, setHidden] = useState(false)

    const data = localStorage.getItem("userData")
    const dataParsed = JSON.parse(data)

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

    return (
    <div className='profile-user-card'>
        <div className='imgprofile-names-info'>
            <img src={dataParsed.imgProfile} alt="" />
            <div className='name-info'>
                <div className='name-last-name'>
                    <span>{dataParsed.name} {dataParsed.lastName} </span>
                    {
                        dataParsed.privacy === "private" ?
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                        )
                        :
                        (
                            dataParsed.privacy === "public" &&
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M17,8H7V7a5,5,0,0,1,9.375-2.422,1,1,0,0,0,1.749-.971A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5.006,5.006,0,0,0,17,8Zm3,11a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                            )
                        )
                    }
                </div>
                <span className='userName'>{dataParsed.userName}</span>
            </div>
            <div className='follows-container'>
                <div className='followers'>
                    <span className='name-info'>Followers</span>
                    <span className='info'>{dataParsed.followers.length}</span>
                </div>
                <div className='following'>
                    <span className='name-info'>Following</span>
                    <span className='info'>{dataParsed.following.length}</span>
                </div>
            </div>
        </div>
        <div className='myLists-container'>
            <span>My favourites lists: </span>
            <span>{dataParsed.myLists.length}</span>
            <button onClick={() => hidden ? setHidden(false) : setHidden(true)}>Show lists</button>
        </div>
        <div className={`list-to-show ${hidden ? "hidden" : "flex"}`} >
            {
                dataParsed.myLists.map((list, idx) => (
                    <div onClick={() => showListPosts(list)} key={idx} className='container-name-list'>
                        <span>{list.name}</span>
                    </div>
                ))
            }
        </div>
        <UserPostComponent dataParsed={dataParsed}/>
    </div>
  )
}

export default ProfileInfoComponent
