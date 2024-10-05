import React, { useEffect, useState } from 'react'
import "./CardComponent.css"
import { formatISOToDDMMYYYY } from '../../core/services/utils'
import { sendComment } from '../../core/services/postServices/postServices'
import e from 'cors'
import { createNewList } from '../../core/services/userServices/userServices'
import DateComponent from './DateComponent/DateComponent'

const CardComponent = ({post, fetchData}) => {
    const [showMoreComments, setShowMoreComments] = useState(false)
    const commentsToShow = showMoreComments ? post.comments : post.comments.slice(0, 0);

    return (
        <div className='card-component'>
            <div className='userPoster-info-container'>
                <img src={post.userPoster.imgProfile} alt="" />
                <span className='userPoster'>{post.userPoster.userName}</span>
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
            <DateComponent post={post}/>
        </div>
  )
}

export default CardComponent
