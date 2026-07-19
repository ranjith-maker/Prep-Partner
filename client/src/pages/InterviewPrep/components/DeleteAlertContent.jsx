import React from 'react'




export default function DeleteAlertContent({content , onDelete}) {
  
  return (
  
    <div className=' p-5  ' >
      <p className='text-lg ' > {content}
        </p>

          <div className='flex justify-end mt-6 ' >
            <button
            onClick={onDelete}
            type='button'
            className='btn-small '
            >
            Delete
            </button>
          </div>
      </div>

  )

}






