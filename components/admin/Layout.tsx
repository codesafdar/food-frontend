import React, { ReactNode } from "react";
import CategoryTabs from './Product'
import Link from 'next/link'
import Image from 'next/image'



interface IRootProps {
  children?: ReactNode
  // any props that come into the component
}

const SideBar = ({ children, ...props }: IRootProps) => {
  return (
    <>
      <div className="flex bg-gray-100 text-gray-900">
        <div className="flex h-screen max-w-[160px] min-w-[160px] flex-col pt-3 items-center border-r border-gray-200 bg-white">
          <div className="flex  items-center justify-center border-b border-gray-200 p-2">
            <Image
              src="/images/nayabs.jpeg"
              width={100}
              height={70}
              priority
              alt="Picture of the author"
              layout="responsive"
              
            />
          </div>
          <nav className="flex flex-1 flex-col gap-y-4 pt-10">
            <Link href='/admin' className="text-sm text-blue-600">Add Product</Link>
            <Link href='/admin/add-category' className="text-sm text-blue-600">Add Categories</Link>
            <Link href='/admin/add-option' className="text-sm text-blue-600">Add Option</Link>
          </nav>
          {/* <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100">
            <svg width="24" height="24" className="h-6 w-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 16H12.01M12 8V12V8Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button> */}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}

export default SideBar