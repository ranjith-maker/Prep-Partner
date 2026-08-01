import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import moment from 'moment'
import RoleInfoHeader from './components/RoleInfoHeader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { API_PATHS, BASE_URL } from '../../utils/apiPaths'
import {motion} from 'framer-motion'
import QuestionCard from '../../components/Cards/QuestionCard'
import {AnimatePresence} from 'framer-motion'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import AIResponsePreview from './components/AIResponsePreview'
import LearnMore from './components/LearnMore'
import SkeletonLoader from './components/SkeletonLoader'



export default function InterviewPrep() {

const {sessionId} = useParams()

const [sessionData, setSessionData] = useState(null)
const [errorMsg ,  setErrorMsg ] = useState('')


const [openLearnMore, setOpenLearnMore] = useState(false)
const [explanation, setExplanation ] = useState(null)
  
const [loading, setLoading] = useState(false)
const [isUpdateLoader, setIsUpdateLoader ] = useState(false)

//in the last apis we asked to ai and saved in db
//here we're gonna show the saved data [questions and answer ]


async function fetchSessionDetailsById() {
  
  try {
    const response = await axios.get(
    `${BASE_URL}${API_PATHS.SESSION.GET_ONE_SESSION(sessionId)}`, 
     {withCredentials : true} 
   )

   let update = response.data?.data
   setSessionData(update)

  } catch (error) {
    console.error('Error', error)
    
  }

}


//this api call is for concept explanation user click learn more

async function generateConceptExplanation(question) {
  
   try {
    
    setErrorMsg('')
    setExplanation(null)
    setLoading(true)
    setOpenLearnMore(true)

    const response = await axios.post(`${BASE_URL}${API_PATHS.AI.GENERATE_EXPLANATIONS}`,
     { question },
     { withCredentials : true }
    )

    if(response.data?.data){
      setExplanation(response.data?.data)
    }
   } catch (error) {
    setExplanation(null)
    setErrorMsg('Failed to generate explanation, Try again later')
     console.error('Error', error)
   } finally{
    setLoading(false)
   }

}


//here we're pinning question

async function toggleQuestionPinStatus(id) {

  const previousData = sessionData;

  // update UI immediately and matching backedn call also
  setSessionData(prev => ({
    ...prev,
    questions: prev.questions
      .map(q =>
        q._id === id  ? { ...q,  isPinned: !q.isPinned }  : q
      )
    .sort((a, b) => {

        // pinned first
        if (a.isPinned !== b.isPinned) {
          return Number(b.isPinned) - Number(a.isPinned);
        }

        // newest first inside same group
        return new Date(b.createdAt) - new Date(a.createdAt);

      })
  }));

  try {

    await axios.post(
      `${BASE_URL}${API_PATHS.QUESTION.PIN(id)}`,
      {},
      {withCredentials:true}
    );

  } catch(error) {

    // restoring old state if API fails
    setSessionData(previousData);

    console.error(error);

  }
}

//adding more question as the user clicks load more 

async function uploadMoreQuestion() {
  
  try {
   setIsUpdateLoader(true)
   const aiResponse = await axios.post(`${BASE_URL}${API_PATHS.AI.GENERATE_QUESTIONS}`,
    {role : sessionData?.role,
      experience : sessionData?.experience,
      topicsToFocus:sessionData?.topicsToFocus,
      numberOfQuestions: 5
    },
    {withCredentials : true}) 
   const generatedQuestions = aiResponse.data?.data

   const response = await axios.post(`${BASE_URL}${API_PATHS.QUESTION.ADD_TO_SESSION}`,
    { sessionId,
      questions: generatedQuestions
     },
     {
      withCredentials:true
     }
   )
   if(response.data?.data){
    toast.success('Added more questions for you')
    fetchSessionDetailsById()
   }

  } catch (error) {
    if(error.response.data?.message){
      setErrorMsg(error.response.data.message)
    }else{
      setErrorMsg('Unable to save generated questions. Please try again.')
    }
  } finally{
    setIsUpdateLoader(false)
  }

}

useEffect(()=>{
  if(sessionId){
    fetchSessionDetailsById()
  }

},[sessionId])



  return (
  
    <DashboardLayout>
      
       <RoleInfoHeader
       role={sessionData?.role || ''}
       topicsToFocus={sessionData?.topicsToFocus || ''}
       experience={sessionData?.experience || ''}
       questions={sessionData?.questions.length || '' }
       description={sessionData?.description || '' }
       lastUpdated={sessionData?.updatedAt ? moment(sessionData?.updatedAt).format('Do MMM YYYY') : '' }  
       />


            <div className="max-w-6xl mx-auto pt-4 pb-6 px-5">

            <h2 className="text-lg font-semibold text-black">
                 Interview Q & A
             </h2>
 
              <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
              
              <div 
              className={`${openLearnMore ? "col-span-12 lg:col-span-8" : "col-span-12 lg:col-span-9"}`}>
                <AnimatePresence>
                  {sessionData?.questions?.map((data, index)=>{
                    return (
                      <motion.div
                        key={data._id || index}
                        initial={{ opacity : 0, y:-20 }}
                        animate={{ opacity : 1, y:0 }}
                        exit={{ opacity : 0 , scale :0.95 }}
                        transition={{
                          duration: 0.4,
                          type : 'spring',
                          stiffness:100,
                          delay: index * 0.1,
                          damping: 15,
                        }}
                        layout
                        layoutId={`question-${data._id || index  } `} 
                        >
                          <QuestionCard
                            question={data?.question}
                            answer={data?.answer}
                            onLearnMore={()=> generateConceptExplanation(data.question) }
                            isPinned={data?.isPinned}
                            onTogglePin={()=>toggleQuestionPinStatus(data._id) }
                          />
                      </motion.div>
                    )
                  })}   
                {  sessionData?.questions?.length > 0 &&  
               ( <div className="flex justify-center mt-5">
                        <button
                        disabled={isUpdateLoader}
                        onClick={uploadMoreQuestion}
                        className="flex items-center gap-3 text-sm cursor-pointer text-white font-medium bg-black px-5 py-2 rounded"
                      >
                        {isUpdateLoader ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> 
                        ) : (
                          <LuListCollapse className="text-lg" />
                        )}
                        Load More
                      </button>
                  </div>)
                  
                  }

                </AnimatePresence>

              </div>

            </div>

            <div>
              <LearnMore
               isOpen={openLearnMore}
               onClose={()=>setOpenLearnMore(false)}
               title={!loading && explanation?.title}
              > 
              { errorMsg && (
                <p className=' flex gap-2 text-sm text-amber-600  font-medium ' >
                   <LuCircleAlert className='mt-5 ' /> {errorMsg}
                  </p>
              ) }

              { loading && <SkeletonLoader/> }
              {!loading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )  }


              </LearnMore>
            </div>

       </div>

      </DashboardLayout>
  
  )

}






