import React, { useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

// redux
import { resetError, deleteOption, editOption } from '@/redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addOption } from '@/redux/actions'
// icons
import { FaTrash, FaEdit } from "react-icons/fa"

// components
import { TailSpin } from 'react-loader-spinner'
import ShowToast from '@/components/common/ShowToast'

// interface
export interface InputFields {
  option: string
  isRequired: boolean
  isMultiple: boolean
  id?: string
}
// initial values
const initialValues = {
  option: '',
  isRequired: false,
  isMultiple: false
}

// schema
const validationSchema = Yup.object({
  option: Yup.string().required('Please enter option'),
})

// component
const AddOption = () => {
  const { optionsList, isLoading, isError, errormessage } = useAppSelector(state => state.admin)
  console.log("🚀 ~ file: add-option.tsx:38 ~ AddOption ~ errormessage:", errormessage,isError)
  const getOption = useAppSelector(state => state.admin.editedOption)
  const { option, id, isRequired, isMultiple } = getOption || {}

  const dispatch = useAppDispatch()

  const submitFormData = (values: InputFields, actions: FormikHelpers<InputFields>) => {
    dispatch(addOption(values))
    actions.resetForm()
    // dispatch(editOption({ id: undefined }))
  }

  const { handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
  })

  useEffect(() => {
    // if (getOption) {
    //   setFieldValue('option', option)
    //   setFieldValue('isMultiple', isMultiple)
    //   setFieldValue('isRequired', isRequired)
    // }
  }, [getOption])

  useEffect(() => {
    const delayReset = setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return () => clearTimeout(delayReset)
  }, [isError])

  return (
    <form className='flex flex-col items-center justify-center mt-4' onSubmit={handleSubmit}>
      <div className='text-2xl font-bold text-gray-600'>Add Option</div>
      <div className={`${(touched.option && errors.option) ? 'mb-0' : 'mb-3'} mt-4 text-center`}>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Option
        </label>
        {isError && <ShowToast message={errormessage} type='error' />}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option}
          name='option'
          className="appearance-none md:w-[500px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
          placeholder="Enter option name" />
        {
          (touched.option && errors.option) &&
          <div className="text-red-600 text-sm mb-3">{errors.option}</div>
        }
      </div>
      <div className="flex justify-between md:w-[500px] mb-3">
        <div className='text-md'>Required</div>
        <input
          checked={values.isRequired}
          onChange={handleChange}
          name='isRequired'
          className='w-5'
          type='checkbox' />
      </div>
      <div className="flex justify-between md:w-[500px]">
        <div className='text-md'>Multiple</div>
        <input
          checked={values.isMultiple}
          onChange={handleChange}
          name='isMultiple'
          className='w-5'
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
            <TailSpin color='red' />
          </div>
          :
          <ol className='list-decimal ml-auto mr-auto w-1/2 mt-2'>
            {optionsList.map((item, index) => {
              return (
                <div className='flex flex-row justify-between items-center mb-2' key={index}>
                  <div className=''>
                    <li className='pl-1'>{item.option}
                      {(item.isRequired || item.isMultiple) && <span className='text-yellow-600 mx-1'>
                        ({item.isRequired && 'Required'}{(item.isRequired && item.isMultiple) && ', '}{item.isMultiple && 'Multiple'})
                      </span>} </li>
                  </div>
                  <div className='flex space-x-3'>
                    <div
                      onClick={() => dispatch(deleteOption(index))}
                      className='text-red-600'>
                      <FaTrash />
                    </div>
                    <div
                      onClick={() => { dispatch(editOption({ id: index, value: item.option })) }}
                      className='text-green-600'>
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

export default AddOption