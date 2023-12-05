import React, { useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from 'yup'


// components
import CategoryList from "@/components/admin/CategoryList";
import { setCategoryList,editCategory } from "@/redux/slices/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Input {
  category: string
}

const initialValues = {
  category: ''
}

const AddCategory = () => {
  const dispatch = useAppDispatch()
  const getCategory = useAppSelector(state => state.admin.editedCat)

  // submit form data
  const submitFormData = (values: Input, actions: FormikHelpers<Input>) => {
    dispatch(setCategoryList({ ...values, id: getCategory?.id }))
    actions.resetForm()
    dispatch(editCategory(undefined))
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
    if (getCategory?.item) setFieldValue('category', getCategory?.item)
  }, [getCategory])

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

export default AddCategory