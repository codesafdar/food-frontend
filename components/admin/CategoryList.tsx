import React from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { FaTrash, FaEdit } from "react-icons/fa"
import { deleteCategory, editCategory } from '@/redux/slices/adminSlice'

const CategoryList = () => {
  const categoryList = useAppSelector(state => state.admin.categoryList)
  // console.log("🚀 ~ file: CategoryList.tsx:8 ~ CategoryList ~ categoryList:", categoryList)
  const dispatch = useAppDispatch()

  return (
    <div className='md:ml-40 mt-5 flex flex-col md:items-start'>
      <div className='text-2xl text-pink-500 border-b-2 md:w-[135px] mb-3'>CategoryList</div>
      <ol className='mb-2 md:ml-4 list-decimal border-red-700 w-1/3'>
        {categoryList.map((item, index) => {
          return (
            <div
              key={index}
              className='flex items-center justify-between mb-2'>
              <div>
                <li>{item}</li>
              </div>
              <div className='flex space-x-3'>
                <div
                  onClick={() => dispatch(deleteCategory(index))}
                  className='text-red-600'>
                  <FaTrash />
                </div>
                <div
                  onClick={() => { dispatch(editCategory(index)) }}
                  className='text-green-600'>
                  <FaEdit />
                </div>
              </div>
            </div>
          )
        })}
      </ol>
    </div>
  )
}

export default CategoryList