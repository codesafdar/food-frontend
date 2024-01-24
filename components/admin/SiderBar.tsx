import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useAppDispatch } from "@/redux/hooks";
import { resetToast } from "@/redux/slices/adminSlice";
import { useRouter } from "next/router";


const SideBar = () => {
  const [adminToken, setAdminToken] = useState<null | string>('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(resetToast())
    localStorage.removeItem('token')
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { role } = JSON.parse(localStorage.getItem('token') || '')
      if (role !== 'superAdmin') {
        router.replace('/admin')
      }
      setAdminToken(role)
    }
  }, [])

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
          <Link href='/admin/category' className="text-lg text-red-600">
            Categories
          </Link>
          <Link href='/admin/options' className="text-lg text-red-600">
            Options
          </Link>
          {
            adminToken === 'superAdmin' &&
            <Link href='/admin/create-admin' className="text-lg text-red-600">
              Create Admin
            </Link>
          }
        </nav>
        <Link
          href='/auth/admin-login'
          onClick={() => handleLogout()}
          className="text-lg text-red-600">
          Logout
        </Link>
      </div>
    </>
  )
}

export default SideBar