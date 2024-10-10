import React, { useEffect, useState } from 'react'
import "./CardComponent.css"
import { formatISOToDDMMYYYY } from '../../core/services/utils'
import DateComponent from './DateComponent/DateComponent'
import { useDispatch } from 'react-redux'
import { showDataUserFound } from '../HeaderComponent/UserFoundAction'
import { setLoading } from '../IndexComponent/InfoAction'
import { findUserByName, followUser } from '../../core/services/userServices/userServices'
import { useNavigate } from 'react-router-dom'

const CardComponent = ({post, fetchData}) => {
    const [showMoreComments, setShowMoreComments] = useState(false)
    const [following, setFollowing] = useState(false)
    const [hideButton, setHideButton] = useState(undefined)
    const commentsToShow = showMoreComments ? post.comments : post.comments.slice(0, 0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = localStorage.getItem("userData")
    const userDataParsed  = JSON.parse(userData)
    const findUser = async (name) => {
        try {
            dispatch(setLoading(true))
            const data = await findUserByName(name)
            dispatch(showDataUserFound(data.data[0]))
            navigate(`/index/user/${data._id}`)
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(setLoading(false))
        }
      }

      const handleFollowUser = async (userId) => {
        await followUser(userId)
      }

      useEffect(() => {
        if(userDataParsed.following.includes(post.userPoster._id)){
            setFollowing(true)
        }else if(userDataParsed._id === post.userPoster._id){
            setHideButton(true)
        }
      },[])
      console.log(userDataParsed)
    return (
        <div className='card-component'>
            <div className='userPoster-info-container'>
                <div className='img-span'>
                    <img src={post.userPoster.imgProfile} alt="" />
                    <span  onClick={() => findUser(post.userPoster.userName) } className='userPoster'>{post.userPoster.userName}</span>
                </div>
                {
                    !hideButton ?
                    (
                        <button onClick={() => handleFollowUser(post.userPoster._id) } className={following ? `following` : `follow`}>{following ? "Following" : "Follow"}</button>
                    )
                    :
                    (
                        null
                    )
                }
            </div>
            <div className='img-and-name-container'>
                <span>{post.postName}</span>
                <img src={post.post} alt="" />
            </div>
            <div className='container-description'>
                <span className='userPoster'>{post.userPoster.userName}</span>
                <span className='post-description'>{post.description}</span>
            </div>
            
            <div className='container-comments'>
                <span 
                    className='show-more-btn' 
                    onClick={() => setShowMoreComments(!showMoreComments)}
                >
                    {showMoreComments ? "Hide comments" : "Show comments..."}
                </span>
                {commentsToShow.map((com, idx) => (
                    
                        com.content === "" || com.content === " " || com.content === undefined ? 
                        (
                            null
                        )
                        :
                        (
                            <div className='comments' key={idx}>
                                <span className='userPoster'>{com.usuario.userName}</span>
                                <span className='comment-content'>{com.content ? com.content : null}</span>
                                <span className='date-comment'>{formatISOToDDMMYYYY(com.date)}</span>
                            </div>      
                        )                    
                ))}
            </div>
            <DateComponent post={post} fetchData={fetchData}/>
        </div>
  )
}

export default CardComponent
