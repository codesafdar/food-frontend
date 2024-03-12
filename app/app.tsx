'use client'
import { useAppSelector } from '@/redux/hooks'
import ShowToast from '@/components/common/ShowToast'
import { RootLayoutProps } from './layout'
import '@/app/globals.css'


export default function App({ children }: RootLayoutProps) {
  const { isSuccess, isError, errormessage, successMessage } = useAppSelector(state => state.admin)

  return (
    <>
      {
        (isSuccess && !!successMessage) && <ShowToast message={successMessage} type='success' />
      }
      {
        (isError && !!errormessage) && <ShowToast message={errormessage} type='error' />
      }
      {children}
    </>
  )
}