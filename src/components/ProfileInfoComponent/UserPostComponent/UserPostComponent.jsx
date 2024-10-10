import React from 'react'

const UserPostComponent = ({userInfo}) => {
    return (
        <div className='user-posts-container'>
                {
                    userInfo.posts.map((post, idx) => (
                        <div key={idx}>
                            <div className='post-container' onClick={() => console.log(post)}>
                                <img src={post.postPath || post.post} alt="" />
                                <span>{post.postName}</span>
                            </div>
                        </div>
                    ))
                }
        </div>
  )
}

export default UserPostComponent
