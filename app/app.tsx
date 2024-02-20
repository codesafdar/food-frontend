'use client'
import type { AppProps } from 'next/app'
// import { store } from '@/redux/store'
// import { Provider } from 'react-redux'
import '@/app/globals.css'
import { useAppSelector } from '@/redux/hooks'
import ShowToast from '@/components/common/ShowToast'


export default function App({ children }: any) {
  const { isSuccess, isError, errormessage, successMessage } = useAppSelector(state => state.admin)


  return (
    <>
      {
        isSuccess && <ShowToast message={successMessage} type='success' />
      }
      {
        isError && <ShowToast message={errormessage} type='error' />
      }
      {children}
    </>
  )
}