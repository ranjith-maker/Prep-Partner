import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown , LuPi, LuPin, LuPinOff, LuSparkles  } from 'react-icons/lu'
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview'



export default function QuestionCard(

{question ,
answer ,    
onLearnMore,
isPinned,
onTogglePin,
}
) {

    
const [isExpanded, setIsExpanded ] = useState(false)
const [height, setHeight] =  useState(0)
const contentRef = useRef(null)




useEffect(()=>{
 if(isExpanded){
    const contentHeight = contentRef.current.scrollHeight
    setHeight(contentHeight + 10) 
 }else{
    setHeight(0)
 }

},[isExpanded])

function toggleExpand() {
    setIsExpanded(!isExpanded)
}


return (

<div className="bg-white rounded-lg mb-3 overflow-hidden py-3 px-4 shadow-sm border border-gray-100 group">

  <div className="flex items-start justify-between cursor-pointer">


    <div className="flex items-start gap-3 min-w-0">


      <span className="text-sm font-semibold text-gray-400 leading-5">
        Q
      </span>


      <h3 onClick={toggleExpand} className="text-sm md:text-[15px] font-medium text-gray-800 leading-relaxed cursor-pointer">
        {question}
      </h3>


    </div>

    <div className="flex items-center ml-3 shrink-0">


      <div className={`flex ${isExpanded ? "md:flex" : "md:hidden group-hover:flex"}`}>


        <button onClick={onTogglePin} className="flex items-center gap-1 text-xs text-nowrap border border-indigo-100 bg-indigo-50 px-2.5 py-1 mr-2 rounded text-indigo-800 hover:border-indigo-200">

          {
            isPinned
            ?
            <LuPinOff className="text-xs"/>
            :
            <LuPin className="text-xs"/>
          }

        </button>

        <button
          onClick={()=>{
            setIsExpanded(true);
            onLearnMore();
          }}
          className="flex items-center gap-1 text-xs text-cyan-800 text-nowrap border border-cyan-100 bg-cyan-50 px-2.5 py-1 mr-2 rounded hover:border-cyan-200"
        >

          <LuSparkles/>

          <span className="hidden md:block">
            Learn More
          </span>

        </button>
      </div>

      <button onClick={toggleExpand} className="text-gray-400 hover:text-gray-500 cursor-pointer">

        <LuChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />

      </button>

    </div>

  </div>


  <div style={{maxHeight:`${height}px`}} className="overflow-hidden transition-all duration-300 ease-in-out">


    <div ref={contentRef} className="mt-3 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">

      <AIResponsePreview content={answer}/>

    </div>


  </div>


</div>

)


}

                          