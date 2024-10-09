import React, { useState } from 'react'
import "./CardComponent.css"
import { formatISOToDDMMYYYY } from '../../core/services/utils'
import DateComponent from './DateComponent/DateComponent'
import { useDispatch } from 'react-redux'
import { showDataUserFound } from '../HeaderComponent/UserFoundAction'
import { setLoading } from '../IndexComponent/InfoAction'
import { findUserByName } from '../../core/services/userServices/userServices'
import { useNavigate } from 'react-router-dom'

const CardComponent = ({post, fetchData}) => {
    const [showMoreComments, setShowMoreComments] = useState(false)
    const commentsToShow = showMoreComments ? post.comments : post.comments.slice(0, 0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    return (
        <div className='card-component'>
            <div className='userPoster-info-container'>
                <img src={post.userPoster.imgProfile} alt="" />
                <span  onClick={() => findUser(post.userPoster.userName) } className='userPoster'>{post.userPoster.userName}</span>
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
