import React, { useState } from 'react'
import "./UserListsComponent.css"
const UserListsComponent = ({usersList, path}) => {

   return (
    <div className='userList-card'>
        <h1>{path}</h1>
      {
        usersList ? 
        (
            usersList.map((user,idx) => (
                <div key={idx} className='cnt-info'>
                    <img src={user.imgProfile}/>
                    <div className='cnt-name'>
                        <p>{user.userName}</p>
                    </div>
                </div>
            ))
        )
        :
        (
            <>
                <span>No data found</span>
            </>
        )
      }
    </div>
  )
}

export default UserListsComponent
