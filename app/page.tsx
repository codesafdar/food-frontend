'use client'
import ShowToast from '@/components/common/ShowToast'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const page = () => {
  const { isSuccess, isError, errormessage, successMessage } = useAppSelector(state => state.admin)
  
  return (
    <div>
      {/* isSuccess && <ShowToast message={successMessage} type='success' /> */}
    </div>
  )
}

export default page