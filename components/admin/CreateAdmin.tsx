'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '@/components/common/ErrorField'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createAdminAction, getAllUsers, updateAdmin } from '@/redux/actions'
import { TailSpin } from 'react-loader-spinner'

interface IAdminProps {
  isEdit?: boolean
  data?: ICreateAdmin
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ICreateAdmin {
  fName: string
  lName: string
  email?: string
  role: string
  password?: string
  confirmPassword?: string
  isEdit?: boolean
  _id?: ''
}

const initialValues: ICreateAdmin = {
  fName: '',
  lName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
  isEdit: false
}

// validation schema
const validationSchema = Yup.object({
  fName: Yup.string().required('This field is required'),
  lName: Yup.string().required('This field is required'),
  isEdit: Yup.boolean(),
  email: Yup.string()
    .when('isEdit', {
      is: (val: boolean) => val == false,
      then: () => Yup.string().email('Invalid email format').required('This field is required'),
      otherwise: () => Yup.string(),
    }),
  role: Yup.string().required('This field is required'),
  password: Yup.string()
    .when('isEdit', {
      is: (val: boolean) => val == false,
      then: () => Yup.string().required('This field is required'),
      otherwise: () => Yup.string(),
    }),
  confirmPassword: Yup.string()
    .when('isEdit', {
      is: (val: boolean) => val == false,
      then: () => Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Passwords must match'),
      otherwise: () => Yup.string(),
    })
})


const CreateAdmin = ({ isEdit = false, data, setShowModal }: IAdminProps) => {
  const dispatch = useAppDispatch()
  const { isLoading, isSuccess } = useAppSelector(state => state.admin)
  const [role, setRole] = useState<string>('')

  const handleFormSubmit = async (values: ICreateAdmin) => {
    try {
      if (isEdit) {
        const { email, confirmPassword, isEdit, ...result } = values
        result._id = data?._id
        dispatch(updateAdmin(result))
        setShowModal && setShowModal(false)
      } else dispatch(createAdminAction(values))
    } catch (error) {
      console.log(error)
    }
  }


  const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm, setFieldValue } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    const adminRole = localStorage.getItem('role') || ''
    setRole(adminRole)
    if (isEdit) {
      setFieldValue('isEdit', isEdit)
      setFieldValue('fName', data?.fName)
      setFieldValue('lName', data?.lName)
      setFieldValue('role', data?.role)
    }
  }, [])


  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (isSuccess) resetForm()
  }, [isSuccess])

  return (
    <div>
      {
        role && role !== 'super_admin'
          ?
          <div className='text-red-500 text-center mt-6'>
            You are not authorized to access this page
          </div>
          :
          <form onSubmit={handleSubmit}>
            <div className={`${isEdit ? 'w-full' : 'w-1/2'} px-3 pb-3 text-center ml-auto mr-auto  mt-5 space-y-6 flex flex-col justify-center`}>
              <div className='text-xl font-bold'>
                {isEdit ? 'Update' : 'Create Admin'}
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

              {
                !isEdit &&
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
              }

              <div>
                <div className="w-full mb-6 md:mb-0">
                  <div className="relative">
                    <select
                      onChange={handleChange}
                      value={values.role}
                      name='role'
                      className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="" className='text-red-600'>Please choose admin role</option>
                      <option value='super_admin'>Super Admin</option>
                      <option value='admin'>Admin</option>
                      <option value='employee'>Employee</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                {
                  (errors.role && touched.role) &&
                  <ErrorField error={errors.role} />
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
                    className="bg-blue-600 rounded-lg w-1/2 mx-auto py-3 text-center text-xl font-semibold text-white">
                    Submit
                  </button>
              }
            </div>
          </form>
      }
    </div>
  )
}

export default CreateAdmin