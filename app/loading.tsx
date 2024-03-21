'use client'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <TailSpin color='green' />
    </div>
  )
}

export default Loading