import React from 'react'

export default function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
}) {

return (
  <div className="bg-white relative">

    <div className="max-w-6xl mx-auto px-5 md:px-0">

      <div className="min-h-[150px] flex flex-col justify-center relative z-10">


        <div>

          <h2 className="text-xl md:text-2xl font-semibold">
            {role}
          </h2>


          <p className="text-sm md:text-base text-gray-900 mt-1">
            {topicsToFocus}
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">

          <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
            {questions} Q & A
          </div>


          <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
            Last Updated: {lastUpdated}
          </div>


        </div>


      </div>


      <div className="hidden md:flex w-[35vw] h-40 items-center justify-center bg-white overflow-hidden absolute top-0 right-0">

        <div className="w-16 h-16 bg-green-300 blur-[65px] animate-blob1"/>
        <div className="w-16 h-16 bg-teal-200 blur-[65px] animate-blob2"/>
        <div className="w-16 h-16 bg-cyan-200 blur-[45px] animate-blob3"/>
        <div className="w-16 h-16 bg-fuchsia-400 blur-[45px] animate-blob1"/>

      </div>


    </div>

  </div>
)

}
      