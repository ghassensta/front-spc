import React from 'react'

export default function LanguageNav() {
  return (
    <div className='flex items-end gap-1 bg-[#F6F5E9] px-4 py-3 w-full justify-end'>
        <button className='text-lg font-tahoma text-[#33373D]'><span className="fi fi-gb"></span></button>
        
        <button className='text-lg font-tahoma text-[#33373D]'><span className="fi fi-fr"></span></button>
        
        <button className='text-lg font-tahoma text-[#33373D]'><span className="fi fi-de"></span></button>
        
        <button className='text-lg font-tahoma text-[#33373D]'><span className="fi fi-it"></span></button>
        
        <button className='text-lg font-tahoma text-[#33373D]'><span className="fi fi-es"></span></button>
    </div>
  )
}
