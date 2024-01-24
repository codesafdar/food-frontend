import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik, Formik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '@/components/common/ErrorField'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { adminLogin } from '@/redux/actions'
import ShowToast from '@/components/common/ShowToast'
import { resetToast } from '@/redux/slices/adminSlice'
import { TailSpin } from 'react-loader-spinner'
import { useRouter } from 'next/router'


export interface IAdminLogin {
  email: string
  password: string
}

const initialValues: IAdminLogin = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('Please enter password')
})

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [token, setToken] = useState<null | string>('')

  const { isError, errormessage, isLoading, isSuccess } = useAppSelector(state => state.admin)

  const handleFormSubmit = (values: IAdminLogin, { resetForm }: { resetForm: () => void }) => {

    try {
      dispatch(adminLogin(values))
      if (isSuccess) {
        resetForm()
      }

    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace('/admin')
    }
  }, [isSuccess])

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    const delayReset = setTimeout(() => {
      dispatch(resetToast())
    }, 5000)
    return () => clearTimeout(delayReset)
  }, [isError])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token')
      setToken(localToken)
      if (localToken) {
        router.replace('/admin')
      }
    }
  }, [router])

  return (
    <>
      {
        token ?
          <div className='flex justify-center items-center w-full h-[100vh] bg-white'>
            <TailSpin color='green' />
          </div>
          :
          <section id='login' className="pt-6 md:pt-10 px-4 max-h-full">
            {isError && <ShowToast message={errormessage} type='error' />}
            <form onSubmit={handleSubmit} className=''>
              <div className="font-bold text-[42px] md:text-[52px] text-center text-pink-600 mb-2">
                Cheezious
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white drop-shadow-2xl px-5 py-6 md:mx-[100px] lg:mx-[300px] xl:mx-[500px]">
                <div className="font-medium text-xl text-yellow-500">
                  Login to Cheezious as admin
                </div>
                <div className="w-full md:w-11/12 mt-5 space-y-6 flex flex-col">
                  <div>
                    <input
                      className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder='Email address or phone number'
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
                  <button
                    type='submit'
                    disabled={isLoading || isError}
                    className="bg-blue-600 rounded-lg w-full py-3 text-center text-xl font-semibold text-white">
                    Log in
                  </button>
                  <div className="flex items-center py-4">
                    <div className="flex-grow h-px bg-gray-400"></div>
                    <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
                      or
                    </span>
                    <div className="flex-grow h-px bg-gray-400"></div>
                  </div>
                  <button disabled className="text-blue-600 text-lg font-medium w-full">
                    Forgotton account?
                  </button>
                </div>
              </div>
            </form>
          </section>
      }
    </>
  )
}

export default Login