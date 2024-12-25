import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './contex/UserContext.jsx'
import CaptainContext from './contex/CaptainContext.jsx'
import SocketProvider from './contex/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CaptainContext>
  <UserContext>
  <SocketProvider>
  <BrowserRouter>
   <App />
  </BrowserRouter>
  </SocketProvider>
  </UserContext>
  </CaptainContext>
    
  </StrictMode>,
)