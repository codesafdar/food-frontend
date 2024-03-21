'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllProducts } from '@/redux/actions'
import { TailSpin } from 'react-loader-spinner'
import Home from '@/components/client/Home'

const page = () => {

  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(state => state.admin)
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div>
      <Home />
    </div>
  )
}

export default page