// import React, { useContext, useState } from 'react'
// import { UserDataContext } from '../contex/UserContext'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import axiosInstance from '../utlis/axiosinstace'

// const UserLogin = () => {
//     const [email, setEmail] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [ userData, setUserData ] = useState({})

//     const {user,setUser} = useContext(UserDataContext)
//     const navigate = useNavigate()

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         const userData = {
//             email:email,
//             password:password
//         }
        
        
//         try{
        
//         const response = await axiosInstance.post('/users/login', userData);
//         if(response.status === 200){
//           const data = response.data
//           setUser(data.user)
//           localStorage.setItem('token', data.token)
//           navigate('/home')
//         }
//       }catch(e){
//         console.error('Error during login:', error.response ? error.response.data : error.message);
//       }

//         setEmail('')
//         setPassword('')

//     }



//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//      <div>
//      <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

//        <form onSubmit={(e) => {
//         submitHandler(e)
//        }}>
//          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//          <input
//           required
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value)
//           }}
//           className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//           type='email'
//           placeholder='write email here'
//           />
//            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

//            <input
//              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//              value={password}
//              onChange={(e) => {
//               setPassword(e.target.value)
//              }}
//              required
//              type='password'
//              placeholder='password'
//            />

//            <button 
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//            >
//             Login
//            </button>
//        </form>
//        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
//      </div>

//      <div>
//      <Link
//           to='/captain-login'
//           className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//         >Sign in as Captain</Link>
//      </div>

//     </div>
//   )
// }

// export default UserLogin




// //  , {
//   // headers: {
//     // Authorization: `Bearer ${token}`
//   // },
// // }

// // const token  = localStorage.getItem('token')



import React, { useContext, useState } from 'react';
import { UserDataContext } from '../contex/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../utlis/axiosinstace';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  console.log(setUser);
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      console.log('Sending login request');
      const response = await axiosInstance.post('/users/login', userData);
      console.log('Response received', response);

      console.log("response data", response.data);
      

      if (response.data) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);

        console.log("Navigating to home...");
        navigate('/home');

        console.log("Navigation successful");
        // Clear form fields after successful login
        // setEmail('');
        // setPassword('');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="logo" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='Enter your email'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            placeholder='Enter your password'
          />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
            Login
          </button>
        </form>
        <p className='text-center'>
          New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link>
        </p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
