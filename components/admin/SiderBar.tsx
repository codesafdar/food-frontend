import React from "react";
import Link from 'next/link'

const SideBar = () => {
  return (
    <>
        <div className="flex h-screen max-w-[160px] min-w-[160px] flex-col pt-3 items-center border-r border-gray-200 bg-white">
          <div className="flex  items-center justify-center border-b border-gray-200 p-2">
            <img
              src="https://res.cloudinary.com/devorbis/image/upload/v1681628287/myPhoto_ngncxq.jpg"
              width={100}
              height={70}
              alt="Picture of the author"
              className="rounded"
            />
          </div>
          <nav className="flex flex-1 flex-col gap-y-4 pt-10">
            <Link href='/admin' className="text-lg text-red-600">
              Products
            </Link>
            <Link href='/admin/add-category' className="text-lg text-red-600">
              Categories
            </Link>
            <Link href='/admin/add-option' className="text-lg text-red-600">
              Options
            </Link>
            <Link href='/admin/add-option' className="text-lg text-red-600">
              Create Admins
            </Link>
          </nav>
          <Link href='/admin/login' className="text-lg text-red-600">Logout</Link>
        </div>
    </>
  )
}

export default SideBar