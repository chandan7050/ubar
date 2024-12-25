
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../contex/UserContext'
import axiosInstance from '../utlis/axiosinstace'

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
       
    
        if (!token) {
            navigate('/login');
        } else {
            axiosInstance.get('/users/profile', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(' Error:', err);
                localStorage.removeItem('token');
                navigate('/login');
            });
        }
    }, [navigate, axiosInstance]);

  
    if (isLoading && localStorage.getItem('token')) {
        return (
            <div>Loading..</div>
        )
    }
  return (
    <div>
       {children}
    </div>
  )
}

export default UserProtectWrapper


// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserDataContext } from '../contex/UserContext';
// import axiosInstance from '../utlis/axiosinstace';

// const UserProtectWrapper = ({ children }) => {
//     const navigate = useNavigate();
//     const { user, setUser } = useContext(UserDataContext);
//     const [isLoading, setIsLoading] = useState(true);

//     // Token ko baar-baar fetch karne ki zarurat nahi
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         if (!token) {
//             // If no token, redirect to login
//             navigate('/login');
//         } else {
//             axiosInstance.get('/users/profile', {
//                 headers: { Authorization: `Bearer ${token}` } // ✅ No unnecessary conditional
//             })
//             .then(response => {
//                 if (response.status === 200) {
//                     setUser(response.data);
//                     setIsLoading(false); //  Loading complete
//                 }
//             })
//             .catch(err => {
//                 console.error(' Error:', err);
//                 localStorage.removeItem('token');
//                 navigate('/login');
//             });
//         }
//     }, [navigate, setUser]); //  Dependency array me sirf required items


//     if (isLoading) {
//         return (
//             <div>Loading...</div> 
//         );
//     }

//     return (
//         <div>
//             {children} {/* ✅ Render children if user is authenticated */}
//         </div>
//     );
// };

// export default UserProtectWrapper;
