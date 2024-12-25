
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../contex/CaptainContext'
import axiosIntance from '../utlis/axiosinstace'

const CaptainProtectWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }

        axiosIntance.get('/captains/profile', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.status === 200){
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch(err => {
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    },[token])

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div>
     {children}
    </div>
  )
}

export default CaptainProtectWrapper