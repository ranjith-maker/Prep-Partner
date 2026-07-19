
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../../context/userContextAll'
import axios from 'axios'
import { API_PATHS, BASE_URL } from '../../utils/apiPaths'

export default function ProfileInfoCard() {

const navigate = useNavigate()

const {userDetails , setUserdetails} = useContext(userDataContext)
const [loading , setLoading] = useState(false)



async function handleLogout() {
  
try {
  setLoading(true)
  const response = await axios.post(`${BASE_URL}${API_PATHS.AUTH.LOGOUT}`, {},
 {withCredentials : true} )
 
    setUserdetails(null)
    setLoading(false)
    navigate('/')

} catch (error) {

  console.error(error.response?.data?.message)
  setLoading(false)
  setUserdetails(null)
}}




  return userDetails &&  (

    <div  className=' flex items-center     ' >
       <img src={userDetails?.image ||`https://api.dicebear.com/7.x/notionists/svg?seed=${userDetails?.name || "Rohith"}`  } 
       alt={userDetails?.name} 
       className=' w-15 h-15 bg-gray-300 rounded-full mr-3     '
       />
    <div>
      <div className=' text-[15px] text-black font-bold leading-3                                  ' >
         {userDetails?.name || ''}
        </div>    
   

    <button
    onClick={handleLogout}
    className='  text-amber-600 font-semibold cursor-pointer text-md hover:underline            '
    > 
    Logout
    </button> 
    </div>  
    </div>
  
)
}












