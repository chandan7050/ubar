
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utlis/axiosinstace'

const UserLogOut = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axiosInstance.get('/users/logout', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

  return (
    <div>UserLogOut</div>
  )
}

export default UserLogOut