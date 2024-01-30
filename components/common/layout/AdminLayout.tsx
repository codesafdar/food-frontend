'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import SideBar from '@/components/admin/SiderBar'
import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'
import ShowToast from '../ShowToast'
import { useAppSelector } from '@/redux/hooks'

interface ILayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: ILayoutProps) => {
  
  const { isSuccess, isError, errormessage, successMessage } = useAppSelector(state => state.admin)
  const router = useRouter()
  const [token, setToken] = useState<null | string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('access_token')
      setToken(localToken)
      if (!localToken) {
        router.replace('/auth/admin-login')
      }
    }
  }, [])

  
  return (
    <>
      {
        isSuccess && <ShowToast message={successMessage} type='success' />
      }
      {
        isError && <ShowToast message={errormessage} type='error' />
      }

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
    </>
  )
}

export default AdminLayout

