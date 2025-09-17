import React, { useEffect } from 'react'
import {fetchUserDetails} from '../../redux/authSlice'
import {useDispatch} from 'react-redux'

function Home() {
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchUserDetails())
},[dispatch])
  return (
    <div>Home</div>
  )
}


export default Home