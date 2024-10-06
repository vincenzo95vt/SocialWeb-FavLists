import React, { useEffect, useState } from 'react'
import { addPostToUserList, createNewList, refreshUserData } from '../../../core/services/userServices/userServices'
import { sendComment } from '../../../core/services/postServices/postServices'
import { formatISOToDDMMYYYY } from '../../../core/services/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../IndexComponent/InfoAction'


const DateComponent = ({post}) => {
    const [commentArea, setCommentArea] = useState(undefined)
    const [comment, setComment] = useState(undefined)
    const [listContainer, setListContainer] = useState(undefined)
    const [inputArea, setinputArea] = useState(undefined)
    const [listName, setListName] = useState(undefined)
    const [error, setError] = useState(undefined)

    const isLoading = useSelector((state) => state.infoReducer.isLoading)
    const dispatch = useDispatch()

    const userData = localStorage.getItem("userData")
    const userDataParsed = JSON.parse(userData)
    const handleComment = (e) => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }       
    const sendCommentToBack = async () => {
        if(comment){
            await sendComment(comment, post._id)
            fetchData()
        }else{
            setError('Please fill all fields')
        }
    }
    const handleListName = (e) => {
        setListName({
            ...listName,
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    const sendNewList = async () => {
        if(listName){
            try {
                dispatch(setLoading(true))
                await createNewList(listName, post._id)
                await refreshUserData()
            } catch (error) {
                console.error(error)
            }finally{
                dispatch(setLoading(false))
            }
        }
    }

    const sendPostToList = async (listId, postId) => {
        try {
            dispatch(setLoading(true))
            await addPostToUserList(listId, postId)
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(setLoading(false))
        }
    }

   useEffect(() => {
        if(error){
            setTimeout(() => {
                setError(undefined)
            },[3000])
        }
    },[error])
  return (
    <div className='date-container'>
                <div className='textarea-and-list-container'>
                {
                    commentArea &&
                    (
                        <>
                            <textarea className='comment' name="comment" id="" onChange={(e) => handleComment(e)}></textarea>
                            {error && <span className='errorSpan' style={{color:"red"}}>Please write something or close this window</span>}
                            <button onClick={() => sendCommentToBack()}>Send</button>
                        </>   
                    ) 
                    
                }
                </div>
                <div className='container-dp-block'>
                    <div className='svg-and-date'>
                        <svg onClick={() => { commentArea ? setCommentArea(false) : setCommentArea(true)}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m18.5,0H5.5C2.468,0,0,2.467,0,5.5v9c0,3.033,2.468,5.5,5.5,5.5h1.24l3.6,3.031c.479.425,1.079.635,1.674.635.582,0,1.158-.202,1.606-.6l3.708-3.066h1.172c3.032,0,5.5-2.467,5.5-5.5V5.5c0-3.033-2.468-5.5-5.5-5.5Zm2.5,14.5c0,1.378-1.121,2.5-2.5,2.5h-1.712c-.349,0-.687.122-.956.344l-3.828,3.167-3.749-3.158c-.271-.228-.613-.353-.967-.353h-1.788c-1.379,0-2.5-1.122-2.5-2.5V5.5c0-1.378,1.121-2.5,2.5-2.5h13c1.379,0,2.5,1.122,2.5,2.5v9Zm-7.5-4c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm-10,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Z"/></svg>
                        <svg onClick={() => { listContainer ? setListContainer(false) && setinputArea(false): setListContainer(true)}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12,12-5.38,12-12S18.62,0,12,0Zm5.17,11.62l-2.17,1.77,.9,2.73c.12,.37,0,.78-.31,1.01-.31,.24-.73,.25-1.06,.04l-2.52-1.64-2.48,1.66c-.15,.1-.33,.15-.51,.15-.19,0-.39-.06-.55-.18-.31-.23-.44-.64-.32-1.01l.86-2.76-2.18-1.77c-.29-.25-.4-.65-.27-1.01,.13-.36,.48-.6,.86-.6h2.75l.97-2.61c.13-.36,.48-.6,.86-.6s.73,.24,.86,.6l.97,2.61h2.75c.38,0,.73,.24,.86,.6,.13,.36,.02,.77-.27,1.02Z"/></svg>
                        <span>{formatISOToDDMMYYYY(post.date)}</span>
                    </div>
                        {
                            listContainer && 
                            (
                                <div className='list-container'>
                                    <div className='divSpan-lists'>
                                        <ul>
                                            {
                                                isLoading ? 
                                                (
                                                    <span class="loader"></span>
                                                )
                                                :
                                                (
                                                    userDataParsed && (
                                                        userDataParsed.myLists.map((list, idx) => (
                                                            <li onClick={() => sendPostToList(list._id, post._id)} key={idx}>{idx +1}- {list.name}</li>
                                                        ))
                                                    )
                                                )
                                            }
                                            <li className='create-list' onClick={() => {inputArea ? setinputArea(false) : setinputArea(true)}}>Create new list +</li>
                                        </ul>
                                    </div>
                                    {
                                        inputArea &&
                                        (
                                            <div className='list-input-container'>
                                                <input type="text" name='listName' className='list-input' onChange={(e) => handleListName(e)}/>
                                                <button onClick={() => sendNewList()}>Send</button>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                </div>
            </div>
  )
}

export default DateComponent
