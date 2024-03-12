'use client'
import React, { useEffect, memo } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { TailSpin } from 'react-loader-spinner'
import { getCategories, deleteCategory } from '@/redux/actions'
import { ICategoryInput } from './Categories'
import Button from './Button'

// component
const CategoryList = ({ setOnEdit }: any) => {
  const { categoryList, isLoading } = useAppSelector(state => state.admin)
  console.log("🚀 ~ CategoryList ~ isLoading:", isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleUpdate = (item: ICategoryInput) => {
    setOnEdit(item)
  }

  const handleDelete = (item: ICategoryInput) => {
    const id = item._id
    if (id) dispatch(deleteCategory(id))
  }

  return (
    <div className='mt-5 flex flex-col md:items-center'>
      <div className='text-2xl text-pink-500 border-b-2 md:w-[135px] mb-3'>CategoryList</div>
      {
        isLoading ?
          <TailSpin color='green' />
          :
          <ol className='mb-2 md:ml-4 list-decimal border-red-700 w-1/3'>
            {categoryList.length > 0 && categoryList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex items-center justify-between mb-2'>
                  <div>
                    <li>{item?.category}</li>
                  </div>
                  <Button
                    handleDelete={() => handleDelete(item)}
                    handleUpdate={() => handleUpdate(item)}
                  />
                </div>
              )
            })}
          </ol>
      }
    </div>
  )
}

export default (CategoryList)