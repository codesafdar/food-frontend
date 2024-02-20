import React, { ReactNode } from 'react'
import ShowToast from '../ShowToast'
import { useAppSelector } from '@/redux/hooks'


interface IAuthProps {
  children: ReactNode
}

const AuthLayout: React.FC<IAuthProps> = ({ children }) => {
  // const { isSuccess, isError, errormessage, successMessage } = useAppSelector(state => state.admin)

  return (
    <>
      {/* {
        isSuccess && <ShowToast message={successMessage} type='success' />
      }
      {
        isError && <ShowToast message={errormessage} type='error' />
      } */}
      <div className='h-[100vh] bg-black'>{children}</div>
    </>
  )
}

export default AuthLayout