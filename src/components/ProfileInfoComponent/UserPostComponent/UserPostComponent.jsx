import React from 'react'

const UserPostComponent = ({data}) => {
    
    return (
        <div className='user-posts-container'>
                {
                    data.posts.map((post, idx) => (
                        <div key={idx}>
                            <div className='post-container' onClick={() => console.log(post)}>
                                <img src={post.post} alt="" />
                                <span>{post.postName}</span>
                            </div>
                        </div>
                    ))
                }
        </div>
  )
}

export default UserPostComponent
