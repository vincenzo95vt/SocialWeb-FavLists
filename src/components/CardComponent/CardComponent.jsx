import React, { useState } from 'react'
import "./CardComponent.css"
import { formatISOToDDMMYYYY } from '../../core/services/utils'
const CardComponent = ({post}) => {
    const [showMoreComments, setShowMoreComments] = useState(false)
    const [commentArea, setCommentArea] = useState(undefined)


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
            <div className='date-container'>
                <div className='textarea-container'>
                {
                    commentArea && 
                    (
                        <textarea className='comment' name="comment" id=""></textarea>
                    )
                }
                </div>
                <div className='svg-and-date'>
                    <svg onClick={() => { commentArea ? setCommentArea(false) : setCommentArea(true)}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m18.5,0H5.5C2.468,0,0,2.467,0,5.5v9c0,3.033,2.468,5.5,5.5,5.5h1.24l3.6,3.031c.479.425,1.079.635,1.674.635.582,0,1.158-.202,1.606-.6l3.708-3.066h1.172c3.032,0,5.5-2.467,5.5-5.5V5.5c0-3.033-2.468-5.5-5.5-5.5Zm2.5,14.5c0,1.378-1.121,2.5-2.5,2.5h-1.712c-.349,0-.687.122-.956.344l-3.828,3.167-3.749-3.158c-.271-.228-.613-.353-.967-.353h-1.788c-1.379,0-2.5-1.122-2.5-2.5V5.5c0-1.378,1.121-2.5,2.5-2.5h13c1.379,0,2.5,1.122,2.5,2.5v9Zm-7.5-4c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm-10,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Z"/></svg>
                    <svg onClick={() => console.log("fav")} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12,12-5.38,12-12S18.62,0,12,0Zm5.17,11.62l-2.17,1.77,.9,2.73c.12,.37,0,.78-.31,1.01-.31,.24-.73,.25-1.06,.04l-2.52-1.64-2.48,1.66c-.15,.1-.33,.15-.51,.15-.19,0-.39-.06-.55-.18-.31-.23-.44-.64-.32-1.01l.86-2.76-2.18-1.77c-.29-.25-.4-.65-.27-1.01,.13-.36,.48-.6,.86-.6h2.75l.97-2.61c.13-.36,.48-.6,.86-.6s.73,.24,.86,.6l.97,2.61h2.75c.38,0,.73,.24,.86,.6,.13,.36,.02,.77-.27,1.02Z"/></svg>
                    <span>{formatISOToDDMMYYYY(post.date)}</span>
                </div>
            </div>
        </div>
  )
}

export default CardComponent
