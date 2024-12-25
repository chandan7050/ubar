import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../utlis/axiosinstace'
import { UserDataContext } from '../contex/UserContext'
// require("dotenv").config()

const UserSignup = () => {
  const [email,setEmail] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const navigate = useNavigate()

  const {user,setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }

    // console.log("this is url",'URL:', `${import.meta.env.BASE_URL}/users/register`)
    // console.log("this ",'URL:', `${import.meta.env.BASE_URL}`)
    

    try{    
    const response = await axiosInstance.post('/users/register', newUser)
    // console.log("this port user",import.meta.env.BASE_URL);
    

    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
  }catch(e){
    console.error('Error during registration:', error.response ? error.response.data : error.message)
  }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
         <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
         <div className='flex gap-4 mb-7' >
          <input 
           required
           className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
           type='text'
           placeholder='Frist Name'
           value={firstName}
           onChange={(e) => {
            setFirstName(e.target.value)
           }}
           />
          <input 
           required
           className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
           type='text'
           placeholder='Last Name'
           value={lastName}
           onChange={(e) => {
            setLastName(e.target.value)
           }}
           />
         </div>

         <h3 className='text-lg font-medium mb-2'>What's your email</h3>

         <input 
          required
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

           <input 
             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
             value={password}
             onChange={(e) => {
              setPassword(e.target.value)
             }}
             required
             type='password'
             placeholder='Password'
           />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

        </form>
         <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
       </div>
       <div>
       <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
       Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
       </div>

      </div>
    </div>
  )
}

export default UserSignup