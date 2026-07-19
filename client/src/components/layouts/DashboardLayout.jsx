import React, { useContext } from 'react'
import { userDataContext } from '../../context/userContextAll'
import Navbar from './Navbar'

export default function DashboardLayout({children}) {
  
const {userDetails} = useContext(userDataContext)


    return (
    
    <div>

        <Navbar/>
        
       {userDetails && <div> {children} </div> }

    </div>
  
)
}
