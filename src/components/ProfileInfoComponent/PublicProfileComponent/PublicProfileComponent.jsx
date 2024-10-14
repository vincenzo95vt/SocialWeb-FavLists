import React, { useState } from 'react';
import UserPostComponent from '../UserPostComponent/UserPostComponent';

const PublicProfileComponent = ({ userInfo, showListPosts }) => {
    const [hidden, setHidden] = useState(true);

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
    );
};

export default PublicProfileComponent;
