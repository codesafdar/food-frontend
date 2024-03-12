import Image from 'next/image'
import React from 'react'
import companyLogo from '../../public/images/cheezious_logo.webp'
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import Link from 'next/link';


const Footer = () => {
  return (
    <div className='mt-12 md:py-[30px] md:px-[60px] p-3 shadow-lg bg-white rounded-xl'>
      <div className="md:grid md:grid-cols-5 gap-4 md:gap2 flex flex-col">
        <div>
          <Image className='rounded-lg' width={160} height={160} src={companyLogo} alt='logo' />
        </div>
        <div className='col-span-2'>
          <div className='flex flex-col gap-3'>
            <div className='text-base font-semibold text-black'>
              Cheezious
            </div>
            <div className='flex items-center'>
              <FaPhone fill='red' />
              <div className='ml-1 text-black text-[14px]'>03086590821</div>
            </div>
            <div className='flex items-center'>
              <MdEmail fill='red' />
              <div className='ml-1 text-black text-[14px]'>support@cheezious.com</div>
            </div>
            <div className='flex items-center'>
              <MdLocationOn fill='red' />
              <div className='ml-1 text-black text-[14px]'>Cheezious- Johar Town, Lahore</div>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='flex flex-col gap-3'>
            <div className='text-base font-semibold text-black'>
              Our Timings
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-[14px] text-black'>Monday - Sunday</div>
              <div className='text-[14px] text-black'>
                11:00 AM - 03:00 AM
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-[16px] font-semibold text-black'>Follow Us:</div>
              <div className='flex'>
                <Link href='/'>
                  <FaFacebook fill='#007aff' size={25} className='mr-6' />
                </Link>
                <Link href='/'>
                  <FaSquareInstagram fill='red' size={25} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div></div>

      </div>
    </div>
  )
}

export default Footer