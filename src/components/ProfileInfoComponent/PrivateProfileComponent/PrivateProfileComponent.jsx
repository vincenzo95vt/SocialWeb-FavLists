import React from 'react';
import { followUser, requestFollowUser } from '../../../core/services/userServices/userServices';

const PrivateProfileComponent = ({ userInfo }) => {
    const handleFollowUser = async (userId) => {
       const data = await requestFollowUser(userId)
       console.log(data)
      }
    
    return (
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
                    <div className='followers'>
                        <span className='name-info'>Followers</span>
                        <span className='info'>{userInfo.followers?.length || 0}</span>
                    </div>
                    <div className='following'>
                        <span className='name-info'>Following</span>
                        <span className='info'>{userInfo.following?.length || 0}</span>
                    </div>
                </div>
                <div className='container-btn-follow'>
                    <button onClick={() => handleFollowUser(userInfo._id || userInfo.userId)} className='btn-follow'>Follow</button>
                </div>
            </div>
            <div className='private-zone'>
                <svg className='chain' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/>
                    <path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/>
                </svg>
                <span>This user is private</span>
            </div>
        </>
    );
};

export default PrivateProfileComponent;
