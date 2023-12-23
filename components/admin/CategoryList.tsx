import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { FaTrash, FaEdit } from "react-icons/fa"
import { TailSpin } from 'react-loader-spinner'
import { resetError } from '@/redux/slices/adminSlice'
import { getCategories, deleteCategory, updateCategory } from '@/redux/actions'
import ShowToast from '@/components/common/ShowToast'
import { ICategoryInput } from '@/pages/admin/add-category'

const CategoryList = () => {
  const { categoryList, isLoading, isError, errormessage, isSuccess } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const handleUpdate = (data: ICategoryInput) => {
    data = {
      ...data,
      isUpdate: true
    }
    dispatch(updateCategory(data))
  }

  useEffect(() => {
    const delayReset = setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return () => clearTimeout(delayReset)
  }, [isError])
  
  return (
    <div className='md:ml-40 mt-5 flex flex-col md:items-start'>
      <div className='text-2xl text-pink-500 border-b-2 md:w-[135px] mb-3'>CategoryList</div>
      {isError && <ShowToast message={errormessage} type='error' />}
      {isLoading ? <TailSpin color='red' /> :
        <ol className='mb-2 md:ml-4 list-decimal border-red-700 w-1/3'>
          {categoryList?.map((item, index) => {
            return (
              <div
                key={index}
                className='flex items-center justify-between mb-2'>
                <div>
                  <li>{item?.category}</li>
                </div>
                <div className='flex space-x-3'>
                  <div
                    onClick={() => dispatch(deleteCategory(item?._id))}
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
  )
}

export default CategoryList