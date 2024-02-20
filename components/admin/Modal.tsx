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
                {/* {
                  isShowModal.id &&
                  <div className='bg-white px-4 p-5 pb-4'>
                    <SelectedOptionsTable />
                  </div>
                }

                {
                  isShowModal.showImage &&
                  (
                    isShowModal.showImage ?
                      <Image
                        src={isShowModal.showImage}
                        alt='image'
                        width={600}
                        height={600} />
                      : <TailSpin color='green' />
                  )
                }

                {
                  isInputFields &&
                  <React.Fragment>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full px-3 mb-6 md:mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                          Title
                        </label>
                        <input
                          onChange={handleChange}
                          value={values?.optionObj?.itemName}
                          name='optionObj.itemName'
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"
                          type="text"
                          placeholder="Enter name of the item" />
                      </div>
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                          Price
                        </label>
                        <input
                          onChange={handleChange}
                          value={values?.optionObj?.itemPrice}
                          name='optionObj.itemPrice'
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          placeholder="Enter price" />
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
                      <button
                        type="button"
                        onClick={() => handleSubmit}
                        className="ml-auto mr-auto text-green-400 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                        Submit
                      </button>
                    </div>
                  </React.Fragment>
                } */}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal