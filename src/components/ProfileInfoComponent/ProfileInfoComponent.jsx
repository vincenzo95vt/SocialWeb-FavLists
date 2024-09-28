import React from 'react'
import "./ProfileInfoComponent.css"


const ProfileInfoComponent = ({userData}) => {
    console.log(userData)
    const data = userData.userData
    //ERROR EN USERDATA PORQUE VIENE UNDEFINED, VER EL COMPONENTE DE INDEX A VER QUE ES LO QUE TRAE.
    return (
    <div className='profile-user-card'>
      <div className='imgprofile-names-info'>
        <img src={data.imgProfile} alt="" />
        <div className='name-info'>
            <div className='name-last-name'>
                <span>{data.name} </span>
                <span>{data.lastName} </span>
                {
                    data.privacy === "private" ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                    )
                    :
                    (
                        data.privacy === "public" &&
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M17,8H7V7a5,5,0,0,1,9.375-2.422,1,1,0,0,0,1.749-.971A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5.006,5.006,0,0,0,17,8Zm3,11a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/></svg>
                        )
                    )
                }
            </div>
            <span className='userName'>{data.userName}</span>
        </div>
        <div>
            <div className='followers'>
                <span>Followers</span>
                <span>{data.followers}</span>
            </div>
            <div className='following'>
                <span>Following</span>
                <span>{data.following}</span>
            </div>
        </div>
        <div>
            <div>

            </div>
            <span></span>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoComponent