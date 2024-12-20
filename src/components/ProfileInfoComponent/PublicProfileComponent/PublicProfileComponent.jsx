import React, { useState } from 'react';
import UserPostComponent from '../UserPostComponent/UserPostComponent';
import { useNavigate } from 'react-router-dom';
import { followUser } from '../../../core/services/followRequestServices/followRequestServices';
import { findUserById } from '../../../core/services/userServices/userServices';
import { useDispatch } from 'react-redux';
import { showUserList } from '../ProfileInfoAction';

const PublicProfileComponent = ({ userInfo, showListPosts, section, isFollowingYou }) => {
    const [hidden, setHidden] = useState(true);
    const userData = localStorage.getItem("userData")
    const userDataParsed = JSON.parse(userData)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleFollowUser = async (userId) => {
        const message = await followUser(userId)
        if(message === "User followed successfully"){
            setFollowing(true)
        }
      }

    const handleFindUsers = async (arrayIds, followersOrFollowing) => {
        const info = await Promise.all(
            arrayIds.map(userId => findUserById(userId))
        )
        dispatch(showUserList(info))
        if(followersOrFollowing === "following"){
            navigate("/profile/following")
        }else if(followersOrFollowing === "followers"){
            navigate("/profile/followers")
        }
    }

    return (
        <>
        {
            section === "profile" ?
            (
                <>
                    <div className='imgprofile-names-info'>
                        <img src={userInfo.imgProfile} alt="" />
                        <div className='name-info'>
                            <div className='name-last-name'>
                                <span>{userInfo.name} {userInfo.lastName}</span>
                            </div>
                            <span className='userName'>{userInfo.userName}</span>
                        </div>
                        <div className='follows-container'>
                            <div className='cont-followers'  onClick={() => handleFindUsers(userInfo.followers, "followers")}>
                                <span className='name-info'>Followers</span>
                                <span className='info'>{userInfo.followers?.length || 0}</span>
                            </div>
                            <div className='cont-following' onClick={() => handleFindUsers(userInfo.following, "following")}>
                                <span className='name-info'>Following</span>
                                <span className='info'>{userInfo.following?.length || 0}</span>
                            </div>
                        </div>
                        <div onClick={() => navigate(`/profile/update-prof/${userInfo.userId || userInfo._id}`)} className='container-edit-prof'>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="50"><path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-9c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm14.361,13.725l-7.275,7.275h-3.086v-3.086l7.275-7.275c.852-.852,2.234-.852,3.086,0s.852,2.234,0,3.086Zm-10.361,.275H5c-1.103,0-2,.897-2,2v5H0v-5c0-2.757,2.243-5,5-5H13c1.145,0,2.189,.403,3.033,1.053l-2.158,2.158c-.266-.131-.56-.211-.876-.211Z"/></svg>
                        </div>
                    </div>
                    {
                        userInfo.description !== undefined && userInfo.description !== "" ?
                        (
                            <div className='container-description'>
                                <span>{userInfo.description}</span>   
                            </div>
                        )
                        :
                        null
                    }
                    <div className='myLists-container'>
                        <span>My favourites lists: </span>
                        <span>{userInfo.myLists?.length || 0}</span>
                        {
                            userInfo.myLists?.length > 0 &&
                            <button onClick={() => setHidden(!hidden)}>Show lists</button>
                        }
                    </div>
                    <div className={`list-to-show ${hidden ? "hidden" : "flex"}`}>
                        {
                            userInfo.myLists?.map((list, idx) => (
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
                                <span>{userInfo.name} {userInfo.lastName}</span>
                            </div>
                            <span className='userName'>{userInfo.userName}</span>
                        </div>
                        <div className='follows-container'>
                            <div className='cont-followers'  onClick={() => handleFindUsers(userInfo.followers, "followers")}>
                                <span className='name-info'>Followers</span>
                                <span className='info'>{userInfo.followers?.length || 0}</span>
                            </div>
                            <div className='cont-following' onClick={() => handleFindUsers(userInfo.following)}>
                                <span className='name-info'>Following</span>
                                <span className='info'>{userInfo.following?.length || 0}</span>
                            </div>
                        </div>
                        <div className='container-btn-follow'>
                            {
                                userDataParsed.following.includes(userInfo._id || userInfo.userId) ?
                                (
                                    <button onClick={() => handleFollowUser(userInfo._id || userInfo.userId)} className='following'>Following</button>
                                )
                                :
                                (
                                    <button onClick={() => handleFollowUser(userInfo._id || userInfo.userId)} className='btn-follow'>{status === "pending" ? "Pending" : "Follow" }</button>
                                )
                            }
                            {
                                isFollowingYou && 
                                (
                                    <div className="is-following-cnt">
                                        <span>Is following you</span>                                        
                                    </div>

                                )
                            }
                        </div>
                    </div>
                    <div className='myLists-container'>
                        <span>My favourites lists: </span>
                        <span>{userInfo.myLists?.length || 0}</span>
                        {
                            userInfo.myLists?.length > 0 &&
                            <button onClick={() => setHidden(!hidden)}>Show lists</button>
                        }
                    </div>
                    <div className={`list-to-show ${hidden ? "hidden" : "flex"}`}>
                        {
                            userInfo.myLists?.map((list, idx) => (
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
    );
};

export default PublicProfileComponent;
