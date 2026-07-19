import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LuSparkles} from 'react-icons/lu'
import HERO_IMG from '../assets/hero-img.avif'
import { APP_FEATURES } from '../utils/data'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Modal from '../components/Modal'
import { userDataContext } from '../context/userContextAll'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'




export default function LandingPage() {
  
  const navigate = useNavigate()
  
  const [openAuthModal , setOpenAuthModal] = useState(false)
  const [currentPage , setCurrentPage] = useState('login')

  const {userDetails , setUserDetails} = useContext(userDataContext)

  function handleCTA() {
    if(!userDetails){
      setOpenAuthModal(true)
    }else{
      navigate('/dashboard')
    }
  }


  return (
    <>

    <div className='w-full min-h-screen bg-[#FFFCEF] overflow-hidden relative' >

      <div className='w-64 h-64 md:w-125 md:h-125 bg-amber-200/20 blur-[65px] absolute top-0 left-0' />

      <div className='container mx-auto px-4 pt-6 pb-32 md:pb-50 relative z-10' >


        {/* header */}

        <header className='flex justify-between items-center mb-10 md:mb-16' >

          <div className='text-lg md:text-xl text-black font-bold' >
            Prep Partner
          </div>


          {
            userDetails  ? 
            (
              <ProfileInfoCard/>
            )
            :
            (
              <button
              onClick={()=>setOpenAuthModal(true)}
              className='bg-linear-to-r from-primary to-[#e99a4b] text-xs md:text-sm font-semibold text-white rounded-full border border-white transition-colors cursor-pointer hover:bg-black hover:text-white px-5 md:px-7 py-2.5'
              >
                Login / Sign Up
              </button>
            )
          }


        </header>

        {/* Hero */}

        <div className='flex flex-col md:flex-row items-center gap-10 md:gap-0' >


          {/* Left */}

          <div className='w-full md:w-1/2 md:pr-4 text-center md:text-left' >

            <div className='flex justify-center md:justify-start mb-3' >

              <div className='flex items-center gap-2 text-[13px] text-amber-600 px-3 py-1 rounded-full border border-amber-300 font-semibold bg-amber-100' >

                <LuSparkles/> 
                AI Powered

              </div>

            </div>



            <h1 className='text-4xl md:text-5xl text-black font-medium mb-6 leading-tight' >

              Ace Interview with <br />

              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold' >
                AI-Powered
              </span>

              {' '}
              Learning

            </h1>


          </div>


          {/* Right */}

          <div className='w-full md:w-1/2' >

            <p className='text-base md:text-[17px] text-gray-900 mb-6  font-semibold  md:mr-20 text-center md:text-left' >

              Get role-specific questions, expand answers when you need them, dive deeper into concepts , and organize everything your way. From preparation to mastery your ultimate interview toolkit is here.

            </p>


            <div className='flex justify-center md:justify-start' >

              <button
              onClick={handleCTA}
              className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer'
              >
                Get Started Now
              </button>
            </div>


          </div>


        </div>


      </div>

    </div>
        
    {/* Hero Image */}

    <div className='w-full relative z-10' >

      <section className='flex items-center justify-center -mt-46 md:-mt-86 px-4' >

        <img 
        src={HERO_IMG} 
        alt="Hero Image"
        className='w-[90%] md:w-[80vw] rounded-lg'
        />

      </section>



      {/* Features Section */}

      <div className='w-full bg-[#FFFCEF] mt-10' >

        <div className='container mx-auto px-4 pt-10 pb-20' >

          <section className='mt-5' >

            <h2 className='text-xl md:text-2xl font-semibold text-center mb-10 md:mb-12' >
              Features that make you shine
            </h2>



            <div className='flex flex-col items-center gap-8' >


              {/* First 3 cards */}

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full' >

                {APP_FEATURES.slice(0,3).map((feature)=>(

                  <div
                  key={feature.id}
                  className='bg-[#FFFEF8] p-6 rounded-xl shadow-sm transition border border-amber-200  hover:border-amber-500 hover:shadow-xl shadow-amber-300'
                  >

                    <h3 className='text-base font-semibold mb-3' >
                      {feature.title}
                    </h3>


                    <p className='text-gray-600 font-semibold ' >
                      {feature.description}
                    </p>


                  </div>

                ))}

              </div>





              {/* Remaining cards */}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3' >

                {APP_FEATURES.slice(3).map((feature)=>(

                  <div
                  key={feature.id}
                  className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs transition border border-amber-200  hover:border-amber-500 hover:shadow-xl   shadow-amber-300'
                  >

                    <h3 className='text-base font-semibold mb-3' >
                      {feature.title}
                    </h3>


                    <p className='text-gray-600 font-semibold ' >
                      {feature.description}
                    </p>


                  </div>

                ))}
              </div>

            </div>

          </section>

        </div>


      </div>


      {/* Footer */}

      <footer className='text-base font-semibold bg-amber-50 text-secondary text-center p-5 mt-5' >
        See you on the other side of the offer letter ! 
      </footer>



    </div>




    {/* Auth Modal */}


    <Modal
    isOpen={openAuthModal}
    onClose={()=>{
      setOpenAuthModal(false)
      setCurrentPage("login")
    }}
    hideHeader
    >

      <div>

      {
        currentPage === "login" && (
          <Login
          setCurrentPage={setCurrentPage}
          closeModal={()=>setOpenAuthModal(false)}
          />
        )
      }



      {
        currentPage === "signup" && (
          <Signup
          setCurrentPage={setCurrentPage}
          closeModal={()=>setOpenAuthModal(false)}
          />
        )
      }


      </div>


    </Modal>


    </>

  )

}
