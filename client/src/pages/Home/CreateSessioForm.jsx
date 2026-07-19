import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import axios from 'axios'
import { API_PATHS, BASE_URL } from '../../utils/apiPaths'



export default function CreateSessioForm() {

const initialState = {

role: '',
experience : '',
topicsToFocus : '',
description: ''

}

const [formData, setFormdata] = useState(initialState)

const [loading, setLoading] = useState()
const [error, setError ] = useState(null)


const navigate = useNavigate()


function handleChange(key, value) {

setFormdata((prev)=>({
  ...prev , [key] : value
}))

}


async function handleCreateSession(ev) {
    
ev.preventDefault()

const { role,experience, topicsToFocus, description } = formData


if(!role || !topicsToFocus || !experience){
    setError('Please fill all the required fields')
    return
}
setError('')

setLoading(true)

try {
  

const aiResponse = await axios.post(`${BASE_URL}${API_PATHS.AI.GENERATE_QUESTIONS}`,
           { role, experience,
             topicsToFocus, numberOfQuestions : 5
           },
           {
            withCredentials : true
           }
)
//will be an arr of [ { Q&A } ]
const generatedQuestions = aiResponse.data?.data

const response = await axios.post(`${BASE_URL}${API_PATHS.SESSION.CREATE_SESSION}`,
        { ...formData ,
        questions: generatedQuestions
        },
        {
          withCredentials : true
        }  )
   const sessionId = response.data?.data?._id;

   if (sessionId) {
     navigate(`/interview-prep/${sessionId}`); 
  }

} catch (error) {
  if(error.response.data?.message){
    setError(error.response.data?.message)
  } else{
    setError('Something went wrong. Please try again later')
  } 
}finally{
  setLoading(false)
}
}



  return (
    <div className=' justify-center  p-7 flex flex-col   '  >
        <h3 className='text-base md:text-lg   font-semibold text-black  text-center ' >
             Start a New Interview Journey
        </h3>
        <p className=' text-sm text-center   text-slate-700 mt-4     ' >
            Fill out a quick details and unlock your personalised set of interview questions
        </p>

 
     
      <form onSubmit={handleCreateSession}
        className=' flex flex-col gap-3 mt-6 '
      >

        <Input 
        value={formData.role}
        onChange={({ target}) => handleChange('role', target.value)}
        label='Target Role'
        placeholder='eg - Backend Developer , Frontend Developer'
        type='text'
        />

        <Input 
        value={formData.experience}
        onChange={({ target}) => handleChange('experience', target.value)}
        label='Years of experience'
        placeholder='eg - 5 '
        type='number'
        />

        <Input 
        value={formData.topicsToFocus}
        onChange={({ target}) => handleChange('topicsToFocus', target.value)}
        label='Topics to Focus On'
        placeholder='eg - React, Java, Javascript, Rust '
        type='text'
        />

         <Input 
        value={formData.description}
        onChange={({ target}) => handleChange('description', target.value)}
        label='Description'
        placeholder='eg - To become senior developer '
        type='text'
        />

        {error && <p className='  text-red-500 text-base md:text-lg    font-semibold pb-2.5 ' >
            {error}
        </p> }

           <button
          disabled={loading}
          type="submit"
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
        {loading && (
       <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                )}
          {loading ? "Creating Session..." : "Create Session"}
         </button>

      </form>



    </div>
  )
}



