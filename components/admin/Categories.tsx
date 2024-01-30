import React, { useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from 'yup'

// components
import CategoryList from "@/components/admin/CategoryList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCategory } from "@/redux/actions";

// interface
export type ICategoryInput = {
  category?: string
  _id?: string
  isUpdate?: boolean
}

const initialValues = {
  category: ''
}


const Categories = () => {
  const dispatch = useAppDispatch()
  const { editedCat, isError } = useAppSelector(state => state.admin)

  // submit form data
  const submitFormData = (values: ICategoryInput, actions: FormikHelpers<ICategoryInput>) => {
    if (editedCat?.isUpdate) {
      const { isUpdate, _id } = editedCat
      values = {
        _id,
        isUpdate,
        ...values
      }
    }
    dispatch(addCategory(values))
    actions.resetForm()
  }

  const validationSchema = Yup.object({
    category: Yup.string().required('Please add category name')
  })

  const { handleChange, values, errors, setFieldValue, touched, handleSubmit, handleBlur } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
  })

  useEffect(() => {
    if (editedCat?.isUpdate) setFieldValue('category', editedCat?.category)
  }, [editedCat])
  return (
    <div>
    <form className="flex flex-col justify-center items-center px-3" onSubmit={handleSubmit}>
      <div className="p-4 text-2xl text-pink-600">Add categories</div>
      <div className="mb-6 md:mb-0 text-center">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Category
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.category}
          name='category'
          className="appearance-none md:w-[500px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
          placeholder="Enter category name" />
        {
          (touched.category && errors.category) &&
          <div className="text-red-600 text-sm">{errors.category}</div>
        }
      </div>
      <button type="submit" className="justify-center appearance-none mt-8 bg-gray-200 font-bold text-green-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white">
        Submit
      </button>
    </form>
    <CategoryList />
  </div>
  )
}

export default Categories