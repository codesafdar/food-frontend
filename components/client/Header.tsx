import Image from 'next/image'
import React, { useState } from 'react'
import companyLogo from '../../public/images/cheezious_logo.webp'
import { MdOutlineSearch } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { MdArrowDropDown } from "react-icons/md";
import NavItems from './NavItems';
import { MdLocationOn } from "react-icons/md";
import { usePathname } from 'next/navigation'
import SideBar from '../admin/SiderBar';
import SideDrawer from './SideDrawer';


const Header = () => {
  const path = usePathname()
  const [drawer, setDrawer] = useState(false)

  const handleCheckout = () => {
    setDrawer(!drawer)
  }

  return (
    <>
      <SideDrawer drawer={drawer} setDrawer={setDrawer} />
      {/* {drawer ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )} */}
      <div className='bg-yellow-400 height-[82px] top-0 left-0 fixed right-0 py-4 lg:px-24 px-8 z-10 mb-0'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <MdLocationOn fill='#d40000' size={35} />
            <div className='flex flex-col text-black text-[12px]'>
              <div>
                Deliver to
              </div>
              <div>
                G1 market Johar Town Lahore
              </div>
            </div>
          </div>
          <div>
            <Image src={companyLogo} width={50} height={50} alt='logo' />
          </div>
          <div className='flex gap-x-3 items-center text-[#d40000] text-3xl divide-x divide-red-500'>
            <div >
              <MdOutlineSearch />
            </div>
            <div className='px-2'>
              <IoPersonCircle />
            </div>
            <div className='relative px-2 flex items-center cursor-pointer' onClick={handleCheckout}>
              <SlBasket className='mr-4' />
              <MdArrowDropDown className='mt-1' />
              <div className="absolute top-[-10px] left-[30px] font-bold text-gray-700 rounded-full bg-white flex items-center justify-center h-6 w-6 text-[10px]">
                {44}
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        path === '/' &&
        <NavItems />
      }
    </>
  )
}

export default Header