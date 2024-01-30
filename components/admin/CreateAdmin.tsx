import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '@/components/common/ErrorField'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createAdminAction } from '@/redux/actions'
import { TailSpin } from 'react-loader-spinner'

interface IToken {
  role: string
  token: string
}
export interface ICreateAdmin {
  fName: string
  lName: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues: ICreateAdmin = {
  fName: '',
  lName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  fName: Yup.string().required('This field is required'),
  lName: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email format').required('This field is required'),
  password: Yup.string().required('This field is required'),
  confirmPassword: Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Passwords must match')
})

const CreateAdmin = () => {
  const dispatch = useAppDispatch()
  const { isError, isLoading, isSuccess, adminData } = useAppSelector(state => state.admin)

  const [role, setRole] = useState<string>('')

  const handleFormSubmit = async (values: ICreateAdmin) => {
    try {
      dispatch(createAdminAction(values))
    } catch (error) {
      console.log(error)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    const adminRole = JSON.parse(localStorage.getItem('role') || '')
    setRole(adminRole)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      resetForm()
    }
  }, [isSuccess])


  return (
    <div>
      {
        role && role !== 'superAdmin'
          ?
          <div className='text-red-500 text-center mt-6'>
            You are not authorized to access this page
          </div>
          :
          <form onSubmit={handleSubmit}>
            <div className="w-1/2 text-center ml-auto mr-auto  mt-5 space-y-6 flex flex-col justify-center">
              <div className='text-xl font-bold'>
                Create Admin
              </div>
              <div>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder='Enter your first name'
                  name='fName'
                  onChange={handleChange}
                  value={values.fName}
                  onBlur={handleBlur}
                />
                {
                  (errors.fName && touched.fName) &&
                  <ErrorField error={errors.fName} />
                }
              </div>
              <div>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder='Enter your last name'
                  name='lName'
                  onChange={handleChange}
                  value={values.lName}
                  onBlur={handleBlur}
                />
                {
                  (errors.lName && touched.lName) &&
                  <ErrorField error={errors.lName} />
                }
              </div>
              <div>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder='Email address'
                  name='email'
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {
                  (errors.email && touched.email) &&
                  <ErrorField error={errors.email} />
                }
              </div>
              <div>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='Password'
                  onBlur={handleBlur}
                />
                {
                  (errors.password && touched.password) &&
                  <ErrorField error={errors.password} />
                }
              </div>
              <div>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                  onBlur={handleBlur}
                />
                {
                  (errors.confirmPassword && touched.confirmPassword) &&
                  <ErrorField error={errors.confirmPassword} />
                }
              </div>
              {
                isLoading
                  ?
                  <div className='mx-auto'>
                    <TailSpin color='green' />
                  </div>
                  :
                  <button
                    type='submit'
                    disabled={isLoading || isError}
                    className="bg-blue-600 rounded-lg w-1/2 mx-auto py-3 text-center text-xl font-semibold text-white">
                    Create
                  </button>
              }
            </div>
          </form>
      }
    </div>
  )
}

export default CreateAdmin