'use client'
import React from 'react'
import { IFormInput } from './Form'
import { useAppDispatch } from '@/redux/hooks'
import { FormikErrors, FormikValues } from 'formik'
import { setIsShowModal } from '@/redux/slices/adminSlice'
import { TiDeleteOutline } from "react-icons/ti";
import SelectedOptionsTable from './SelectedOptionsTable'
import Image from 'next/image'
import { TailSpin } from 'react-loader-spinner'

// interface
interface IProps {
  isInputFields?: boolean
  handleChange?: (e: React.ChangeEvent<any>) => void
  values?: IFormInput
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<FormikErrors<FormikValues>> | Promise<void>
}



const Modal = ({ children, showModal, setShowModal }: any) => {



  return (
    <>
      {showModal &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div
                  onClick={() => setShowModal(false)}
                  className="cornerDeleteBtn top-[-2px] right-[-2px]">
                  <TiDeleteOutline />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal