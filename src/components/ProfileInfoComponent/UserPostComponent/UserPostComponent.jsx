import React from 'react'

const UserPostComponent = ({dataParsed}) => {
    console.log(dataParsed)
    return (
        <div className='user-posts-container'>
                {
                    dataParsed.posts.map((post, idx) => (
                        <div key={idx}>
                            <div className='post-container' onClick={() => console.log(post)}>
                                <img src={post.postPath} alt="" />
                                <span>{post.postName}</span>
                            </div>
                        </div>
                    ))
                }
        </div>
  )
}

export default UserPostComponent
