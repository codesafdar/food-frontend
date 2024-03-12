import React, { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

interface IAccordionProps {
  title: string
  showItems: boolean
  setShowItems: React.Dispatch<React.SetStateAction<boolean>>

}

const Accordion = ({ title, setShowItems, showItems }: IAccordionProps) => {
  return (
    <div
      onClick={() => setShowItems(!showItems)}
      className='bg-slate-200 py-2 rounded-3xl px-3'>
      <div className='flex justify-between'>
        <div>
          <span className='font-medium text-[14px] text-black'>{title}</span>
          {
            title === 'Variation' &&
            <span className='ml-3 text-white bg-[#8bc34a] px-2 py-1 rounded-md font-normal text-[14px]'>Selected</span>
          }
        </div>
        <div className='rounded-xl bg-[#0000008a] flex justify-center items-center w-5 cursor-pointer h-5'>
          {
            showItems ?
              <MdKeyboardArrowDown className='text-slate-200' size={20} />
              :
              <MdKeyboardArrowUp className='text-slate-200' size={20} />
          }
        </div>

      </div>
    </div>
  )
}

export default Accordion