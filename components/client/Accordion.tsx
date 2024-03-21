import React from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { IOptionType } from '../admin/OptionsAdmin';

interface IAccordionProps {
  item: IOptionType
  showItems: boolean
  setShowItems: React.Dispatch<React.SetStateAction<boolean>>
  values: any
  error: any
  lowerTitle: string
  touched: boolean | undefined
}

const Accordion = ({ item, lowerTitle, setShowItems, showItems, values, error }: IAccordionProps) => {
  const isRequired = item?.isRequired
  const isRequiredError = error && error[lowerTitle]

  return (
    <div
      onClick={() => setShowItems(!showItems)}
      className={`py-2 bg-${isRequiredError ? 'red-500' : 'slate-200'} rounded-3xl px-3`}>
      <div className='flex justify-between'>
        <div>
          <span className={`font-medium text-[14px] text-${isRequiredError ? "white" : "black"}`}>{item?.option}</span>
          {
            isRequired &&
            <span className={`${isRequiredError && 'border-2 border-white p-1 rounded-md'} ml-3 text-white ${values[lowerTitle]?.itemPrice ? 'bg-[#8bc34a]' : 'bg-[#d40000]'}  px-2 py-1 rounded-md font-normal text-[14px]`}>
              {
                values[lowerTitle]?.itemPrice ? 'Selected' : 'Required'
              }
            </span>
          }
        </div>
        <div className='rounded-xl bg-[#0000008a] flex justify-center items-center w-5 cursor-pointer h-5'>
          {
            showItems ?
              <MdKeyboardArrowUp className='text-slate-200' size={20} />
              :
              <MdKeyboardArrowDown className='text-slate-200' size={20} />
          }
        </div>
      </div>
    </div>
  )
}

export default Accordion