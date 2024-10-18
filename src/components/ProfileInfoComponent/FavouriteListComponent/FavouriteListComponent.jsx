import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardComponent from '../../CardComponent/CardComponent'
import "./FavouriteListComponent.css"

const FavouriteListComponent = () => {
    const [info, setInfo] = useState(undefined)
    const postsFromList = useSelector((state) => state.profileInfoReducer.favouritePosts)
    const listData = useSelector((state) => state.profileInfoReducer.listData)
    useEffect(() => {
        console.log(info)
        setInfo(postsFromList)
    }, [])
    console.log(listData)
  return (
    <div className='favourite-list-component'>
        <h1 className='sentence-list'>List of {listData.name}</h1>
        {
            info ? 
            (
                postsFromList.map((post, idx) => (
                    <CardComponent key={idx} post={post} />
                ))
            )
            :
            (
                <div>
                    <span>
                        No posts in your favourite list
                    </span>
                </div>
            )
        }

    </div>
  )
}

export default FavouriteListComponent
