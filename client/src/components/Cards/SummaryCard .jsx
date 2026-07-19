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
    className="relative overflow-hidden rounded-xl border border-gray-300/40 bg-white p-2 shadow-orange-200  group cursor-pointer  hover:-translate-y-1 hover:shadow-xl transition-all duration-300                         "
  >
    {/* Header */}
    <div
      style={{ background: colors.bgcolor }}
      className="relative rounded-lg p-4"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white">
          <span className="text-lg font-semibold text-black">
          {getInitials(role)  }

          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-[17px] font-medium">{role}</h2>

          <p className="mt-1 text-sm text-gray-700">
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

    {/* Footer */}
    <div className="px-3 pb-3">
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="rounded-full border border-gray-900 px-3 py-1 text-[12px] font-medium">
          Experience: {experience} {experience === 1 ? "Year" : "Years"}
        </div>

        <div className="rounded-full border border-gray-900 px-3 py-1 text-[12px] font-medium">
          {questions} Q&A
        </div>

        <div className="rounded-full border border-gray-900 px-3 py-1 text-[12px] font-medium">
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-[12px] font-medium text-gray-500">
        {description}
      </p>
    </div>
  </div>
);
}















