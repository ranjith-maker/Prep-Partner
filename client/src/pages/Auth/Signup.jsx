import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import { userDataContext } from '../../context/userContextAll';
import { API_PATHS, BASE_URL } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import axios from 'axios';



export default function Signup({ setCurrentPage,closeModal }) {

const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [signData, setSignData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

const navigate = useNavigate()

const { userDetails, setUserdetails } = useContext(userDataContext)


const handleChange = (ev) => {
    const { name, value } = ev.target;

    setSignData((prev) => ({
      ...prev, [name]: value,
    }));
  };


 async function handleSignup(ev) {
    ev.preventDefault();

    if (!signData.name.trim()) {
      setError("Please enter the full name");
      return;
    }

    if (!validateEmail(signData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!signData.password) {
      setError("Please enter the password");
      return;
    }

    // Signup API Call
      try {

     setLoading(true)
  const response = await axios.post(`${BASE_URL}${API_PATHS.AUTH.SIGNUP}`, 
    signData, {withCredentials : true} )
 
    const upload = response.data.data
    setUserdetails(upload)
    navigate('/dashboard')
    setSignData(initialState);
    closeModal()
    setLoading(false)

}catch (error) {
  setError(error.response?.data?.message || "Something went wrong while Signup");
  setLoading(false);
  setUserdetails(null);
} }
  
  return (
  

<div className="w-full p-7 flex flex-col justify-center">
   <h3 className='md:text-lg text-base font-semibold text-black text-center' > Create an Account </h3>
     <p className='text-md text-slate-900 mt-1.25 mb-6 text-center  ' >  Join us today to start Preparing for your dream role  </p>

   <form onSubmit={handleSignup}  className='text-center mt-4' >
          <div className="grid grid-cols-1 text-white md:grid-cols-1 gap-4">
     
          <Input
              label="Full Name"
              type="text"
              placeholder="Kelly Rose"
              name="name"
              value={signData.name}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              type="text"
              placeholder="kelly@example.com"
              name="email"
              value={signData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              name="password"
              value={signData.password}
              onChange={handleChange}
            />
        </div>
   
  {error && <p className='text-red-500 text-lg pb-2.5' > {error} </p> } 

  <button type='submit'   disabled={loading}  className='btn-primary mt-2' > 
  {loading ? 'Start Preparing...' : 'SIGN UP' }  </button>

  <p className='text-lg text-slate-800 mt-8 font-semibold  text-center'> Back to crushing interviews ?
  
  <button 
   onClick={ ()=>{
    setCurrentPage('login')
   } }
   className='font-medium text-primary underline ml-5 cursor-pointer hover:no-underline'>
     Login here  
   </button>
  
  </p>


  </form>

 </div>
 
  )

}









