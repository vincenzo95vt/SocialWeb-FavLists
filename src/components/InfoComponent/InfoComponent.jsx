import React, { useEffect, useState } from 'react'
import "./InfoComponent.css"
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromBack } from '../../core/services/postServices/postServices'
import CardComponent from '../CardComponent/CardComponent'
import { setLoading, showData } from '../IndexComponent/InfoAction'


const InfoComponent = () => {
    const [info, setInfo] = useState(undefined)
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()
    const loadingFromReducer = useSelector((state) => state.infoReducer.isLoading)
    const fetchData = async () => {
        dispatch(setLoading(true))
        try {
          const data = await getDataFromBack()
          dispatch(showData(data.posts))
          setInfo(data.posts)
        } catch (error) {
          console.error(error.message)
        }finally{
            dispatch(setLoading(false))
        }
    }
  useEffect(()=> {
      fetchData()
}, [])

    useEffect(() => {
        setLoad(loadingFromReducer)
    }, [loadingFromReducer])

  return (
    <div className='info-component'>
      {
        load ? 
        (
            <span class="loader"></span>
        )
        :
        (
            info !== undefined && 
            (
                <>
                    {
                        info.map((post, idx) => 
                            (
                                <CardComponent key={idx} post={post} fetchData={fetchData}/>
                            ))
                    }
                </>
                
            )
        )
      }
    </div>
  )
}

export default InfoComponent
