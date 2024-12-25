import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utlis/axiosinstace'

const CaptainLogOut = () => {

    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    axiosInstance.get('/captains/logout', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('captain-token')
            navigate('/captain-login')
        }
    })


  return (
    <div>CaptainLogOut</div>
  )
}

export default CaptainLogOut