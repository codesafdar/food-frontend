import React, { ReactNode } from 'react'

interface IAuthProps {
  children: ReactNode
}

const AuthLayout: React.FC<IAuthProps> = ({ children }) => {
  return (
    <div className='h-[100vh] bg-black'>{children}</div>
  )
}

export default AuthLayout