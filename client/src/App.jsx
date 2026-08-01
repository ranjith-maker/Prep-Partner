import React, {  lazy, Suspense } from "react";
import {Routes, Route, replace  } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Shimmer from './components/Shimmer'
import { Navigate } from 'react-router-dom'


import ProtectedRoute from './components/ProtectedRoutes' 
import LandingPage from './pages/LandingPage'

//lazy loaded components

const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep/InterviewPrep"));



export default function App() {


  return (
<>
      <Suspense fallback={<Shimmer />}>
<Routes>

   <Route  path='/'   element={<LandingPage/>} />
  
    <Route element={ <ProtectedRoute/> }  >    
        <Route  path='/dashboard'  element={< Dashboard />}  />
        <Route  path='/interview-prep/:sessionId'  element={<InterviewPrep/>}  />
 </Route> 
 
 <Route  path='*' element={ <Navigate to='/'  replace /> }   />
</Routes>

     </Suspense>

<Toaster
toastOptions={{
  className:'',
  style:{ fontSize : '16px' }
}}

/>

</>

  )

}









