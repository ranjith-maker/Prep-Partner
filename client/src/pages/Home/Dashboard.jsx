import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import {LuPlus } from 'react-icons/lu'
import { CARD_BG } from '../../utils/data'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios, { all } from 'axios'
import { API_PATHS, BASE_URL } from '../../utils/apiPaths'
import moment from 'moment'
import SummaryCard from '../../components/Cards/SummaryCard '
import CreateSessioForm from './CreateSessioForm'

import Modal from '../../components/Modal'
import DeleteAlertContent from '../InterviewPrep/components/DeleteAlertContent'
import Shimmer from '../../components/Shimmer'





export default function Dashboard() {


const navigate = useNavigate()

const [openCreateModal , setOpenCreateModal] = useState(false)
const [session, setSession ] = useState([])


const [openDeleteAlert , setOpenDeleteAlert] = useState({
  open : false,
  data : null
})


async function fetchAllSessions() {
  
  try {
    const response = await axios.get(`${BASE_URL}${API_PATHS.SESSION.GET_ALL_SESSION}`  , {withCredentials : true} )
    const allSession = response.data?.data
    setSession(allSession)


  } catch (error) {
    console.error(error.response?.data?.message) 
  }
}



async function deleteSession() {

  const sessionId = openDeleteAlert.data?._id;

  if (!sessionId) return;

  try {

    const response = await axios.delete(
      `${BASE_URL}${API_PATHS.SESSION.DELETE_SESSION(sessionId)}`,
      {
        withCredentials: true
      }
    );

    if(response.data?.success){

      setOpenDeleteAlert({
        open:false,
        data:null
      });
      
toast.success('Deleted Successfully')
      // refresh sessions
      fetchAllSessions();

    }
  } catch(error){
    console.error(error.response?.data?.message || "Failed to delete session"
    );
  }
}

useEffect(()=>{
  fetchAllSessions()
},[])


    return (
  
    <DashboardLayout>
    

<div className="max-w-6xl mx-auto px-5 py-6">

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        { session.map((data, index)=>(
           <SummaryCard
             key={data?._id}
             colors={CARD_BG[index % CARD_BG.length]}
             role={data?.role || ''}
             topicsToFocus={data?.topicsToFocus}
             experience={data?.experience}
             questions={data?.questions.length || ''}
             description={data?.description || '' }
             lastUpdated={
              data?.updatedAt ? moment(data?.updatedAt).format('Do MMM YYYY') : ''  }
              
              onSelect={()=>navigate(`/interview-prep/${data?._id}`) }
              onDelete={ ()=>setOpenDeleteAlert({open : true , data : data }) }
           />                  

        )) }
      </div>
      <button  
      onClick={()=>setOpenCreateModal(true) }
      className=' h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-primary to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full  hover:bg-black hover:text-white transition-colors cursor-pointer hover-shadow-2xl hover:shadow-orange-500 fixed bottom-10 md:bottom-20 right-10 md:right-20                          ' > 
      <LuPlus className=' text-2xl text-white '      />
        Add New
      </button>
     </div>

     <Modal
       isOpen={openCreateModal}
       onClose={()=>{
        setOpenCreateModal(false)
       }}
       hideHeader
     >
      <div>
        <CreateSessioForm/>
      </div>

     </Modal>


     <Modal
     isOpen={openDeleteAlert?.open}
     onClose={()=>{
      setOpenDeleteAlert({open : false , data : null  })
     }}
     title = 'Delete Alert'
     >
      <div className='  w-full p-2 flex flex-col        '>
        <DeleteAlertContent
        content='Are you sure you want to delete this practice  session ?'
        onDelete={deleteSession}
        />

      </div>

     </Modal>

    </DashboardLayout>
  )
}

