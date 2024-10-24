import React from 'react'
import "./UserListsComponent.css"
const UserListsComponent = ({usersList}) => {

   return (
    <div className='userList-card'>
      {
        usersList ? 
        (
            usersList.map((user,idx) => (
                <div key={idx} className='cnt-info'>
                    <img src={user.imgProfile}/>
                    <p>{user.userName}</p>
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
