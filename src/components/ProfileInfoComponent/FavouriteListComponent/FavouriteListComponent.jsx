import React from 'react'
import { useSelector } from 'react-redux'
import CardComponent from '../../CardComponent/CardComponent'
import "./FavouriteListComponent.css"

const FavouriteListComponent = () => {
  
    const postsFromList = useSelector((state) => state.profileInfoReducer.favouritePosts)
    const listData = useSelector((state) => state.profileInfoReducer.listData)
    console.log(postsFromList, listData)
  return (
    <div className='favourite-list-component'>
        <h1 className='sentence-list'>List of {listData.name}</h1>
        {
            postsFromList ? 
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
