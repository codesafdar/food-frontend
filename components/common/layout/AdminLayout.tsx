'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import SideBar from '@/components/admin/SiderBar'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'

interface ILayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: ILayoutProps) => {
  const router = useRouter()
  const [token, setToken] = useState<null | string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token')
      console.log("🚀 ~ file: AdminLayout.tsx:20 ~ useEffect ~ localToken:", localToken)
      setToken(localToken)
      if (!localToken) {
        router.replace('/auth/admin-login')
      }
    }
  }, [])

  return (
    <Provider store={store}>
      {
        !token ?
          <div className='flex justify-center items-center w-full h-[100vh] bg-white'>
            <TailSpin color='green' />
          </div>
          :
          <div className="flex bg-gray-100 text-gray-900">
            <SideBar />
            <div className='w-full'>{children}</div>
            {/* <footer>Footer admin</footer> */}
          </div>
      }
    </Provider>
  )
}

export default AdminLayout

