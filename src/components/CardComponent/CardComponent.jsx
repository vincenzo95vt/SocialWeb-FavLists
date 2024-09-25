import React, { useState } from 'react'
import "./CardComponent.css"
import { formatISOToDDMMYYYY } from '../../core/services/utils'
const CardComponent = ({post}) => {
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
                    onClick={() => setShowMoreComments(!showMoreComments)} // Corregido el nombre de la función
                >
                    {showMoreComments ? "Hide comments" : "Show comments..."}
                </span>
                {commentsToShow.map((com, idx) => (
                    <div key={idx}>
                        <span className='userPoster'>{com.usuario.userName}</span>
                        <span className='post-description'>{com.content}</span>
                        <span className='date'>{formatISOToDDMMYYYY(com.date)}</span>
                    </div>
                ))}
            </div>
            <div className='date-container'>
                <span>{formatISOToDDMMYYYY(post.date)}</span>
            </div>
        </div>
  )
}

export default CardComponent
