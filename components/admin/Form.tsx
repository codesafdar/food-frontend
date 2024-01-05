import { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from 'yup'
import Image from "next/image";

// components
import Modal from "./Modal";
import { IproductOptionData, setProductData } from "@/redux/slices/adminSlice";

// redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getCategories, getOptions, addProduct, updateProduct } from "@/redux/actions";
import { resetOptionData, setIsShowModal } from "@/redux/slices/adminSlice";

// icons
import { TiDeleteOutline } from "react-icons/ti";
import SelectedOptionsTable from "./SelectedOptionsTable";

interface IOption {
  itemName: string
  itemPrice: number | string
  optionType: string
}

export interface IFormInput {
  category: string
  title: string
  description: string
  startingPrice: number | string
  image: string
  optionObj: IOption
  optionsList?: IproductOptionData[]
  _id?: string
}

export const initialValues: IFormInput = {
  category: '',
  title: '',
  description: '',
  startingPrice: '',
  image: '',
  optionObj: {
    itemName: '',
    itemPrice: '',
    optionType: ''
  }
}

const Form = () => {
  const [randomString, setRandomString] = useState<number>(0)
  const [showImage, setShowImage] = useState<string>('')
  const dispatch = useAppDispatch()
  const { optionsList, categoryList, productOptionData, getOneProductData, isShowModal } = useAppSelector(state => state.admin)

  // schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    startingPrice: Yup.string().required('Please add starting price')
  })


  // submit form
  const submitFormData = (values: IFormInput, actions?: FormikHelpers<IFormInput>) => {
    values.optionsList = productOptionData

    let formData: any = new FormData
    formData.append('category', values.category)
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('startingPrice', values.startingPrice as any)
    formData.append('image', values.image)
    formData.append('optionsList', JSON.stringify(values.optionsList))

    if (getOneProductData?._id) {
      formData.append('id', getOneProductData._id)

      dispatch(updateProduct(formData))
      // dispatch(setProductData({...getOneProductData, _id:''}))
    } else dispatch(addProduct(formData))

    actions && actions.resetForm()
    setRandomString(Math.random())
    dispatch(resetOptionData())
  }

  // formik handling
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setShowImage(objectUrl)
      setFieldValue('image', file)
    }
  };

  const deleteImage = () => {
    setRandomString(Math.random())
    setFieldValue('image', '')
  }

  useEffect(() => {
    if (values?.optionObj?.optionType) dispatch(setIsShowModal({ isShow: true }))
    else dispatch(setIsShowModal({ isShow: false }))
  }, [values?.optionObj?.optionType])

  useEffect(() => {
    dispatch(getOptions())
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    setFieldValue('category', getOneProductData.category)
    setFieldValue('title', getOneProductData.title)
    setFieldValue('image', getOneProductData.image)
    setFieldValue('description', getOneProductData.description)
    setFieldValue('startingPrice', getOneProductData.startingPrice)
    setFieldValue('optionsList', getOneProductData.optionsList)
    setShowImage(getOneProductData.image)
  }, [getOneProductData])

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
                {
                  categoryList.map((item, index) => {
                    return (
                      <option value={item.category} key={index}>{item.category}</option>
                    )
                  })
                }
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
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Description
            </label>
            <textarea onChange={handleChange} value={values.description} name='description' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="Delicious and favorite pizza " />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Base Price
            </label>
            <input onChange={handleChange} value={values.startingPrice} name='startingPrice' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="Enter base price of item" />
            {(touched.startingPrice && errors.startingPrice) &&
              <div className="text-red-600 text-sm mt-2">{errors.startingPrice}</div>
            }
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Options
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                value={values?.optionObj?.optionType}
                name='optionObj.optionType'
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Please choose an option</option>
                {optionsList.map((item, index) => {
                  return (
                    <option value={JSON.stringify(item)} key={index}>{item?.option}</option>
                  )
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            <Modal
              handleChange={handleChange}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="">
              Image
            </label>
            <input
              onChange={handleImageChange}
              name='image'
              accept="image/*"
              key={randomString}
              className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
              placeholder="Select image" />
          </div>
          {values.image && showImage &&
            <div className="imageShow relative">
              <div
                onClick={deleteImage}
                className="cornerDeleteBtn">
                <TiDeleteOutline />
              </div>
              <Image
                src={showImage}
                height={100}
                width={100}
                alt='selected image' />
            </div>
          }
        </div>
        <button type="submit" className="justify-center appearance-none md:w-1/6 mt-8 mb-2 bg-gray-200 font-bold text-green-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          Submit
        </button>
        {
          !isShowModal.id &&
          <div className="w-1/3">
            <SelectedOptionsTable />
          </div>
        }
      </form>
    </>
  )
}

export default Form