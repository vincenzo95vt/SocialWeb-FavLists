import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPostsLists } from '../../../core/services/postServices/postServices'
import { showPost } from '../../IndexComponent/InfoAction'

const UserPostComponent = ({userInfo}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='user-posts-container'>
                {
                    Array.isArray(userInfo.posts) &&
                    (
                        userInfo.posts.map((post, idx) => (
                            <div key={idx}>
                                <div className='post-container'>
                                    <img src={post.postPath || post.post} alt="" />
                                    <span>{post.postName}</span>
                                </div>
                            </div>
                        ))    
                    )
                    
                }
        </div>
  )
}

export default UserPostComponent
