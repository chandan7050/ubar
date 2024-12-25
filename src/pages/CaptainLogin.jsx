import React, { useState } from 'react'
import { CaptainDataContext } from '../contex/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utlis/axiosinstace';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email:email,
      password
    }

    const response = await axiosInstance.post('/captains/login',captain)

    if(response.data){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')

  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      
      <form onSubmit={(e) => {
        submitHandler(e)
      }}
       >
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        type='email'
        placeholder='write your email'
         className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
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
         placeholder='password'
         />

         <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
          Login
         </button>

      </form>

      <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
    </div>
    <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>

    </div>
    </div>
  )
}

export default CaptainLogin


// import React, { useState } from 'react'
// import { CaptainDataContext } from '../contex/CaptainContext'
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../utlis/axiosinstace'
// import { Link } from 'react-router-dom'

// const CaptainLogin = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const { captain, setCaptain } = React.useContext(CaptainDataContext)
//   const navigate = useNavigate()

//   const submitHandler = async (e) => {
//     e.preventDefault()
    
//     try {
//       // 🚀 1️⃣ Send login request to the backend
//       const response = await axiosInstance.post('/captains/login', { email, password })

//       if (response.status === 200) { // ✅ Successful login check
//         const data = response.data
        
//         // 🚀 2️⃣ Set the captain data in context
//         setCaptain(data.captain)

//         // 🚀 3️⃣ Save JWT token in localStorage
//         localStorage.setItem('token', data.token)

//         // 🚀 4️⃣ Navigate to captain-home page
//         navigate('/captain-home')
//       }
//     } catch (error) {
//       console.error('Login Error:', error)

//       // 🚀 Handle specific errors based on status
//       if (error.response) {
//         if (error.response.status === 401) {
//           alert('Invalid email or password')
//         } else {
//           alert('Server error, please try again later.')
//         }
//       } else {
//         alert('Network error, please try again later.')
//       }
//     }

//     // 🚀 5️⃣ (Optional) Clear form inputs
//     setEmail('')
//     setPassword('')
//   }

//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//       <div>
//         <img 
//           className='w-20 mb-3' 
//           src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
//           alt="logo" 
//         />

//         <form onSubmit={submitHandler}>
//           <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//           <input 
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type='email'
//             placeholder='write your email'
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//           />

//           <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
//           <input 
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             type='password'
//             placeholder='password'
//           />

//           <button 
//             type="submit"
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//           >
//             Login
//           </button>
//         </form>

//         <p className='text-center'>
//           Join a fleet? 
//           <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
//         </p>
//       </div>

//       <div>
//         <Link
//           to='/login'
//           className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//         >
//           Sign in as User
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default CaptainLogin
