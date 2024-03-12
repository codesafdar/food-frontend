'use client'
import React from 'react'
import { Circles } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex flex-col h-[100vh] justify-center items-center'>
      <Circles color='green' />
    </div>
  )
}

export default Loading