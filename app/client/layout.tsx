'use client'
import React, { ReactNode } from 'react'

interface ILayoutProps {
  children: ReactNode
}

const ClientLayout = ({ children }: ILayoutProps) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export default ClientLayout