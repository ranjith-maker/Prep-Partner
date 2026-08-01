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

  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const { userDetails } = useContext(userDataContext);


  function handleCTA(){
    if(!userDetails){
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  }


  return (
    <>

    <div className="min-h-screen bg-[#FFFCEF] overflow-hidden">


      {/* HERO */}

      <section className="relative">

        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200/30 blur-[80px]" />


        <div className="max-w-6xl mx-auto px-5 pt-6 pb-16 relative z-10">


          <header className="flex items-center justify-between mb-14">

            <h2 className="text-xl font-bold text-black">
              Prep Partner
            </h2>


            {
              userDetails
              ?
              <ProfileInfoCard/>
              :
              <button
                onClick={()=>setOpenAuthModal(true)}
                className="bg-linear-to-r from-primary to-[#e99a4b] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition"
              >
                Login / Sign Up
              </button>
            }

          </header>


          <div className="grid md:grid-cols-2 gap-10 items-center">


            {/* LEFT */}

            <div className="text-center md:text-left">


              <div className="flex justify-center md:justify-start mb-4">

                <span className="flex items-center gap-2 text-xs text-amber-700 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full font-semibold">

                  <LuSparkles/>
                  AI Powered

                </span>

              </div>



              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">

                Ace Interview with

                <br/>

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 font-bold">
                  AI-Powered
                </span>

                {" "}Learning

              </h1>


            </div>


            {/* RIGHT */}

            <div className="max-w-lg">

              <p className="text-gray-800 text-base md:text-lg font-semibold leading-relaxed mb-7">

                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery your ultimate interview toolkit is here.

              </p>


              <button
                onClick={handleCTA}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-100 hover:text-black transition"
              >
                Get Started Now
              </button>


            </div>


          </div>


        </div>

      </section>


      {/* IMAGE */}

      <section className="max-w-5xl mx-auto px-5 -mt-2">

        <img
          src={HERO_IMG}
          alt="Hero"
          className="w-full h-auto max-h-[560px] object-contain rounded-xl"
        />

      </section>

      {/* FEATURES */}

      <section className="py-16 bg-[#FFFCEF]">

        <div className="max-w-6xl mx-auto px-5">


          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Features that make you shine
          </h2>



          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">


            {
              APP_FEATURES.map((feature)=>(

                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] border border-amber-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition"
                >

                  <h3 className="font-semibold text-base mb-2">
                    {feature.title}
                  </h3>


                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>


                </div>

              ))
            }


          </div>


        </div>


      </section>

      <footer className="bg-amber-50 text-center font-semibold p-5">
        See you on the other side of the offer letter !
      </footer>


    </div>

    {/* MODAL */}

    <Modal
      isOpen={openAuthModal}
      onClose={()=>{
        setOpenAuthModal(false);
        setCurrentPage("login");
      }}
      hideHeader
    >

      {
        currentPage === "login" &&
        <Login setCurrentPage={setCurrentPage} closeModal={()=>setOpenAuthModal(false)}/>
      }


      {
        currentPage === "signup" &&
        <Signup setCurrentPage={setCurrentPage} closeModal={()=>setOpenAuthModal(false)}/>
      }


    </Modal>


    </>

  );
}