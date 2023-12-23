import React, { SetStateAction, Dispatch } from 'react'
import { IFormInput } from './Form'
import { useAppDispatch } from '@/redux/hooks'
// import { addOption } from '@/redux/slices/adminSlice'
import { FormikErrors, FormikValues } from 'formik'

// interface
interface IProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: IFormInput
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

const Modal = ({ showModal, setShowModal, handleChange, values, setFieldValue }: IProps) => {
  const dispatch = useAppDispatch()

  const handleSubmit = (values: IFormInput) => {
    try {
      const { optionObj: { optionType, itemPrice, itemName } } = values
      const data = { optionType, itemName, itemPrice }
      // dispatch(addOption(data))
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setFieldValue('optionObj', {
        itemName: '',
        itemPrice: '',
        optionType: ''
      })
      setShowModal(false)
    }
  }

  return (
    <>
      {showModal &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                      placeholder="Enter name for each item" />
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
                <div className="bg-gray-50 px-4 py-3 sm:flex justify-between sm:px-6">
                  <button
                    type="button"
                    onClick={() => handleSubmit(values)}
                    className="ml-auto mr-auto text-green-400 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal