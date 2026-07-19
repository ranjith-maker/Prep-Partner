import React from 'react'
import {HiOutlineXMark} from 'react-icons/hi2'




export default function Modal({children, title, isOpen, onClose, hideHeader}) {

  if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="relative flex flex-col w-full max-w-lg max-h-[90vh] rounded-lg bg-white overflow-hidden">

        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 flex justify-center items-center cursor-pointer text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-9"
          type="button"
        >
          <HiOutlineXMark className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto">
          {children}
        </div>

      </div>

    </div>
  )
}