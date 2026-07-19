import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import {getInitials} from '../../utils/helper'


export default function SummaryCard ({
  colors ,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
   onSelect,
   onDelete
}) {
 
 
return (
  <div 
  onClick={onSelect}
   className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300">


    {/* Header */}

    <div style={{ background: colors.bgcolor }} className="relative rounded-lg p-3">

      <div className="flex items-start gap-3">

        {/* Avatar */}
         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white">

          <span className="text-base font-semibold text-black">
            {getInitials(role)}
          </span>

        </div>

         {/* Content */}

        <div className="flex-1 min-w-0">

          <h2 className="text-[15px] font-semibold truncate">
            {role}
          </h2>

          <p className="mt-1 text-xs text-gray-700 line-clamp-2">
            {topicsToFocus}
          </p>

        </div>

      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-3 right-3 hidden rounded-md border border-rose-100 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-500 transition hover:border-rose-200 group-hover:flex"
      >
        <LuTrash2 className='cursor-pointer' />
      </button>
    </div>

    


    {/* Body */}

    <div className="px-2 pb-2">

      <div className="mt-3 flex flex-wrap gap-2">

        <div className="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] font-medium">
          Experience: {experience} {experience === 1 ? "Year" : "Years"}
        </div>

        <div className="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] font-medium">
          {questions} Q&A
        </div>


        <div className="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] font-medium">
          Updated: {lastUpdated}
        </div>

      </div>
      <p className="mt-3 line-clamp-2 text-xs font-medium text-gray-500">
        {description}
      </p>

    </div>

  </div>
);
}















