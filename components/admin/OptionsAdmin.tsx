'use client'
import React, { useEffect, useState } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

// redux
import { resetToast } from '@/redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addOption, getOptions, deleteOption, updateOption } from '@/redux/actions'

// icons
import { FaTrash, FaEdit } from "react-icons/fa"

// services
import { TailSpin } from 'react-loader-spinner'

export interface IOptionType {
  option: string
  isRequired: boolean
  isMultiple: boolean
  _id?: string
}

// interface
export interface InputFields {
  optionData: IOptionType
}

// initial values
const initialValues: InputFields = {
  optionData: {
    option: '',
    isRequired: false,
    isMultiple: false,
  }
}

const validationSchema = Yup.object({
  optionData: Yup.object({
    option: Yup.string().required('Please enter option'),
  }),
});

// component
const OptionsAdmin = () => {
  const { optionsList, isLoading } = useAppSelector(state => state.admin)
  const [isUpdate, setIsUpdate] = useState(false)
  const dispatch = useAppDispatch()

  const submitFormData = (values: InputFields, actions: FormikHelpers<InputFields>) => {
    if (isUpdate) dispatch(updateOption(values))
    else dispatch(addOption(values))
    actions.resetForm()
    setIsUpdate(false)
  }

  const { handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
  })

  useEffect(() => {
    dispatch(getOptions())
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(resetToast())
    dispatch(deleteOption(id))
  }
  const handleUpdate = (item: InputFields) => {
    setIsUpdate(true)
    setFieldValue('optionData', item)
  }

  return (
    <form className='flex flex-col items-center justify-center mt-4' onSubmit={handleSubmit}>
      <div className='text-2xl font-bold text-gray-600'>Add Option</div>
      <div className={`${(touched.optionData?.option && errors.optionData?.option) ? 'mb-0' : 'mb-3'} mt-4 text-center`}>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Option
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.optionData.option}
          name='optionData.option'
          className="appearance-none md:w-[500px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
          placeholder="Enter option name" />
        {
          (touched.optionData?.option && errors.optionData?.option) &&
          <div className="text-red-600 text-sm mb-3">{errors.optionData?.option}</div>
        }
      </div>
      <div className="flex justify-between md:w-[500px] mb-3">
        <div className='text-md'>Required</div>
        <input
          checked={values.optionData.isRequired}
          onChange={handleChange}
          name='optionData.isRequired'
          className='w-5 cursor-pointer'
          type='checkbox' />
      </div>
      <div className="flex justify-between md:w-[500px]">
        <div className='text-md'>Multiple</div>
        <input
          checked={values.optionData.isMultiple}
          onChange={handleChange}
          name='optionData.isMultiple'
          className='w-5 cursor-pointer'
          type='checkbox' />
      </div>
      <button type="submit" className="justify-center appearance-none mt-8 bg-gray-200 font-bold text-green-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white">
        Submit
      </button >
      <div className='mt-6 md:w-full text-center flex justify-center flex-col'>
        <div className='text-lg text-center font-medium'>Options</div>
        <div className="border-b-2 border-gray-500 ml-auto mr-auto w-14"></div>
        {isLoading ?
          <div className='ml-auto mr-auto pt-2'>
            <TailSpin color='green' />
          </div>
          :
          <ol className='list-decimal ml-auto mr-auto w-1/2 mt-2'>
            {optionsList?.length > 0 && optionsList.map((item) => {
              return (
                <div className='flex flex-row justify-between items-center mb-2' key={item._id}>
                  <div className=''>
                    <li className='pl-1'>{item.option}
                      {(item.isRequired || item.isMultiple) && <span className='text-yellow-600 mx-1'>
                        ({item.isRequired && 'Required'}{(item.isRequired && item.isMultiple) && ', '}{item.isMultiple && 'Multiple'})
                      </span>} </li>
                  </div>
                  <div className='flex space-x-3'>
                    <div
                      onClick={() => handleDelete(item._id)}
                      className='text-red-600 cursor-pointer'>
                      <FaTrash />
                    </div>
                    <div
                      onClick={() => handleUpdate(item)}
                      className='text-green-600 cursor-pointer'>
                      <FaEdit />
                    </div>
                  </div>
                </div>
              )
            })}
          </ol>
        }
      </div>
    </form>
  )
}

export default OptionsAdmin