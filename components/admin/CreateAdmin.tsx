import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik, Formik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '@/components/common/ErrorField'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { adminLogin, createAdminAction } from '@/redux/actions'
import ShowToast from '@/components/common/ShowToast'
import { resetToast } from '@/redux/slices/adminSlice'
import { TailSpin } from 'react-loader-spinner'
import { useRouter } from 'next/router'

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
  const { isError, isLoading, isSuccess, errormessage } = useAppSelector(state => state.admin)

  const [token, setToken] = useState<IToken>({
    role: '',
    token: ''
  })

  const handleFormSubmit = (values: ICreateAdmin, { resetForm }: { resetForm: () => void }) => {
    try {
      dispatch(createAdminAction(values))
      if (isSuccess) {
        resetForm()
      }
    } catch (error) {
      console.log(error)
    }

  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem('token') || '')
    setToken(adminToken)
  }, [])
  
  useEffect(() => {
    const delayReset = setTimeout(() => {
      dispatch(resetToast())
    }, 5000)
    return () => clearTimeout(delayReset)
  }, [isError])
  // useEffect(()=>{
  //   console.log("🚀 ~ file: CreateAdmin.tsx:76 ~ CreateAdmin ~ isSuccess:", isSuccess)

  // },[isSuccess,isError])

  return (
    <div>
      {
        token && token.role !== 'superAdmin'
          ?
          <div className='text-red-500 text-center mt-6'>
            You are not authorized to access this page
          </div>
          :
          <form onSubmit={handleSubmit}>
            {
              isSuccess && <ShowToast message='Admin created successfully' type='success' />
            }
            {
            (isError && errormessage) && <ShowToast message={errormessage} type='error' />
            }
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
                  disabled={isLoading || isError}
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
                  disabled={isLoading || isError}
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
                  disabled={isLoading || isError}
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
                  disabled={isLoading || isError}
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
                  disabled={isLoading || isError}
                />
                {
                  (errors.confirmPassword && touched.confirmPassword) &&
                  <ErrorField error={errors.confirmPassword} />
                }
              </div>
              {
                isLoading
                  ?
                  <TailSpin color='green' />
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