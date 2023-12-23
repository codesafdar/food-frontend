import { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from 'yup'
import Modal from "./Modal";
import { tabItems, options } from "@/utils/constants";
import { useAppSelector } from "@/redux/hooks";

interface IOption {
  itemName: string
  itemPrice: number | string
  optionType: string
}
export interface IFormInput {
  category: string
  title: string
  description: string
  startingPrice: number | undefined
  image: string
  optionObj: IOption
}

const initialValues: IFormInput = {
  category: '',
  title: '',
  description: '',
  startingPrice: undefined,
  image: '',
  optionObj: {
    itemName: '',
    itemPrice: '',
    optionType: ''
  }
}

const Form = () => {
  const [showModal, setShowModal] = useState(false)

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required')
  })

  const submitFormData = (values: IFormInput, actions?: FormikHelpers<IFormInput>) => {
    console.log('Form submitted with values:', values)
    actions && actions.resetForm()
  }

  // formik handling
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
    // validateOnChange: false,
    // validateOnBlur: false
  })

  // console.log('valesss>>>>', values)

  useEffect(() => {
    if (values?.optionObj?.optionType) setShowModal(true)
    else setShowModal(false)
  }, [values?.optionObj?.optionType])

  return (
    <>
      <form className="w-full text-center" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              category
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                value={values.category}
                name='category'
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value='' className="text-gray-700">Please select category</option>
                {tabItems.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>{item.name}</option>
                  )
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            {(touched.category && errors.category) &&
              <div className="text-red-600 text-sm mt-2">{errors.category}</div>
            }
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Title
            </label>
            <input onChange={handleChange} onBlur={handleBlur}
              value={values.title}
              name='title'
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Pizza" />
            {(touched.title && errors.title) &&
              <div className="text-red-600 text-sm">{errors.title}</div>
            }
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Description
            </label>
            <input onChange={handleChange} value={values.description} name='description' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Delicious and favorite pizza " />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Base Price
            </label>
            <input onChange={handleChange} value={values.startingPrice} name='price' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="Enter base price of item" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Options
            </label>
            <div className="relative">
              <select onChange={handleChange} value={values?.optionObj?.optionType} name='optionObj.optionType' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Please choose an option</option>
                {options.map((item, index) => {
                  return (
                    <option value={item} key={index}>{item}</option>
                  )
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              handleChange={handleChange}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="">
              Image
            </label>
            <input onChange={handleChange} value={values.image} name='image' accept="image/*" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="file" placeholder="Select image" />
          </div>
        </div>
        <button type="submit" className="justify-center appearance-none md:w-1/6 mt-8 bg-gray-200 font-bold text-green-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip">
          Submit
        </button>
      </form>
    </>
  )
}

export default Form