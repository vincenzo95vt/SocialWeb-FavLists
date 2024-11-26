import React, { useEffect, useState } from 'react';
import './ProfileInfoComponent.css';
import { getPostsLists } from '../../core/services/postServices/postServices';
import { useDispatch, useSelector } from 'react-redux';
import { showFavouritePosts, showListData } from './ProfileInfoAction';
import { setLoading } from '../IndexComponent/InfoAction';
import { useNavigate } from 'react-router-dom';
import PublicProfileComponent from './PublicProfileComponent/PublicProfileComponent';
import PrivateProfileComponent from './PrivateProfileComponent/PrivateProfileComponent';
import { refreshUserData } from '../../core/services/userServices/userServices';

const ProfileInfoComponent = ({ section, path }) => {
    const [userInfo, setUserInfo] = useState(undefined);
    const [isFollowingYou, setIsFollowingYou] = useState(false)
    const data = localStorage.getItem("userData");
    const dataParsed = JSON.parse(data);
    const userFoundFromReducer = useSelector((state) => state.userFoundReducer.userFound);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showListPosts = async (list) => {
        try {
            console.log(list)

            dispatch(setLoading(true));
            const data = await Promise.all(
                list.favouritePosts.map(id => getPostsLists(id))
            );
            console.log(data)
            dispatch(showFavouritePosts(data));
            dispatch(showListData(list));
            navigate(`/profile/favouriteList/${list._id}`);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    useEffect(()=> {
        console.log(dataParsed)
        if(dataParsed.followers.includes(userFoundFromReducer?.userId)){
            setIsFollowingYou(true)
        }else{
            setIsFollowingYou(false)
        }
    },[])
    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            setUserInfo(JSON.parse(data));
        }
    }, [])
    useEffect(() => {        
        if (section === "index" && path === "user") {
            setUserInfo(userFoundFromReducer);
        } else if (section === "profile" || section === "profile" && path === "favouriteLists") {
            setUserInfo(dataParsed);
        }
    }, [section, path, userFoundFromReducer]);

    if (!userInfo) {
        return <div><span>No data to show</span></div>;
    }

    console.log("UI",userInfo)
    console.log("DATAINFO",dataParsed)
    return (
        <div className='profile-user-card'>
            
            {
                section === "profile" ?
                (
                    <PublicProfileComponent section={"profile"} path={path} userInfo={userInfo} showListPosts={showListPosts} />
                )
                :
                (
                    userInfo.privacy === "private" ? (
                        <PrivateProfileComponent isFollowingYou={isFollowingYou} userInfo={userInfo} showListPosts={showListPosts} />
                    ) : (
                        userInfo.userName === dataParsed.userName ?
                        (
                            <PublicProfileComponent section={"profile"} path={path} userInfo={userInfo} showListPosts={showListPosts} />
                        )
                        :
                        (
                            <PublicProfileComponent isFollowingYou={isFollowingYou} userInfo={userInfo} showListPosts={showListPosts} />
                        )
                    )
                )
            }
            
        </div>
    );
};

export default ProfileInfoComponent;
