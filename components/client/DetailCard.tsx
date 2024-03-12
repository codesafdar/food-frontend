import Image from 'next/image';
import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import alfardPasta from '../../public/images/alfardPasta.webp'
import Link from 'next/link';
import Accordion from './Accordion';
import DividerComp from '../common/Divider';
import { useFormik } from 'formik'



const DetailCard = () => {
  const [showItems, setShowItems] = useState(true)
  const [showItems2, setShowItems2] = useState(true)


  return (
    <div className='shadow-lg bg-white rounded-xl p-4 pr-12'>
      <div className='flex gap-2 items-center'>
        <div className=''>
          <Link href='/' className='cursor-pointer text-slate-300 text-[12px] font-normal'>
            Home
          </Link>
        </div>
        <div>
          <MdKeyboardArrowRight className='text-slate-300 ' />
        </div>
        <div className='text-[12px] font-normal text-black'>Heading</div>
      </div>
     <form> 
      <div className='grid grid-cols-3 mt-8'>
        <div>
          <Image src={alfardPasta} height={400} width={400} className='rounded-lg' alt='product' />
        </div>
        <div className='col-span-2 ml-6'>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center relative'>
              <div className='text-[34px] font-bold text-black'>
                Chicken Tikka
              </div>
              <div className='p-2 rounded-3xl bg-gray-300 absolute right-5 top-2'>
                <FiHeart className='text-xl' color='red' fill='red' />
              </div>
            </div>
            <div className='text-base font-normal text-[#888888]'>
              Tender Chunks of Marinated Grilled Chicken with Savory Onion
            </div>
          </div>
          <div className='mt-8'>
            <Accordion title='Variation' showItems={showItems} setShowItems={setShowItems} />
            {
              showItems &&
              <>
                <div className='flex justify-between items-center cursor-pointer px-3 my-3'>
                  <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                      className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                      type="radio"
                      value='price'
                      name="variation"
                    />
                    <label
                      className="mt-px inline-block ps-[0.15rem] text-[14px] text-black hover:cursor-pointer"
                    >
                      Small
                    </label>
                  </div>
                  <div className='text-black text-[14px]'>
                    PRICE
                  </div>
                </div>
                <DividerComp />
              </>
            }
          </div>
          <div className='mt-4'>
            <Accordion title='Extra Topping' showItems={showItems2} setShowItems={setShowItems2} />
          </div>
          <div className='flex justify-between mt-6'>
            <div className='flex gap-3 items-center'>
              <div
                className='rounded-3xl cursor-pointer hover:bg-yellow-400 hover:text-black flex justify-center items-center text-[24px] bg-[#d40000] text-white w-[34px] h-[34px]'>
                -
              </div>
              <div className='rounded-2xl text-black w-[52px] h-[36px] px-3 flex justify-center items-center text-[14px] border-2'>
                2
              </div>
              <div className='rounded-3xl cursor-pointer hover:bg-yellow-400 hover:text-black flex justify-center items-center text-[24px] bg-[#d40000] text-white w-[34px] h-[34px]'>
                +
              </div>
            </div>
            <button className="rounded-full w-1/2 bg-[#d40000] font-bold text-white px-4 py-2 hover:bg-yellow-400 hover:text-black">
              <div className='flex justify-between items-center'>
                <div>Rs. 5444</div>
                <div>
                  Add To Cart
                </div>
              </div>
            </button>
          </div>
        </div>


      </div>
      </form>
    </div>
  )
}

export default DetailCard