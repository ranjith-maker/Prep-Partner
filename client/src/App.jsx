import React, { useContext } from 'react'
import {Routes, Route, replace  } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ProtectedRoute from './components/ProtectedRoutes' 
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import { userDataContext } from './context/userContextAll'
import Shimmer from './components/Shimmer'
import { Navigate } from 'react-router-dom'





export default function App() {


  return (
<>

<Routes>

   <Route  path='/'   element={<LandingPage/>} />
  
    <Route element={ <ProtectedRoute/> }  >    
        <Route  path='/dashboard'  element={< Dashboard />}  />
        <Route  path='/interview-prep/:sessionId'  element={<InterviewPrep/>}  />
 </Route> 
 <Route  path='*' element={ <Navigate to='/'  replace /> }   />
</Routes>

<Toaster
toastOptions={{
  className:'',
  style:{ fontSize : '15px' }
}}

/>


</>

  )

}









