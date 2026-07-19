import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { API_PATHS, BASE_URL } from '../../utils/apiPaths'
import { userDataContext } from '../../context/userContextAll'
import axios from 'axios'

export default function Login( {setCurrentPage, closeModal}  ) {
  
const [email , setEmail] = useState('')
const [password, setPassword] = useState('')

const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

const navigate = useNavigate()

const { userDetails, setUserdetails } = useContext(userDataContext)


 async function handleLogin(ev) {
  
  ev.preventDefault()

  if(!validateEmail(email)){
    setError('Please enter a valid email')
    return 
  }

  if(!password){
    setError('Please enter the password')
    return 
  }


// //Login API call

try {
  setLoading(true)
  const response = await axios.post(`${BASE_URL}${API_PATHS.AUTH.LOGIN}`, 
    {email , password,} , {withCredentials : true} )
 
    const upload = response.data.data
    setUserdetails(upload)
    setLoading(false)
    closeModal()
    navigate('/dashboard')
    // console.log(upload);
    

} catch (error) {
  setError(error.response?.data?.message)
  setUserdetails(null)
  setLoading(false)

}
 }

  return (

<>
 
<div className="w-full p-7 flex flex-col justify-center">
   <h3 className='text-base md:text-lg   font-semibold text-black text-center' > Welcome Back to Restart your Preparing </h3>
     <p className='text-md text-slate-900 mt-1.25 mb-6 text-center  ' >  Please enter your details to login   </p>

   <form onSubmit={handleLogin}  className='text-center mt-4' >

    <Input
    value={email}
    onChange={({ target }) => setEmail(target.value)}
    label='Email Address'
    placeholder='Malini@gmail.com'
    type='text'
    />

    <Input
    value={password}
    onChange={({ target }) => setPassword(target.value)}
    label='Password'
    placeholder='Min 8 characters'
    type='password'
    />
   
  {error && <p className='text-red-500 text-lg pb-2.5' > {error} </p> } 

  <button type='submit'   disabled={loading}  className='btn-primary   mt-2   ' > 
  {loading ? 'loging in...' : 'LOGIN' }  </button>

  <p className='text-lg text-slate-800 mt-8 md:font-semibold  text-center ' > Future You is begging you to signup now {" "}
  
  <button type='button'
   onClick={ ()=>{
    setCurrentPage('signup')
   } }
   className='font-medium text-primary underline ml-5 cursor-pointer hover:no-underline'>
     Signup here  
   </button>
  
  </p>


  </form>

 </div>
 
</>

  )
}









