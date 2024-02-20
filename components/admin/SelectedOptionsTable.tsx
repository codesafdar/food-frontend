'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { FaTrash } from 'react-icons/fa'
import { deleteProductOption } from '@/redux/slices/adminSlice'

const SelectedOptionsTable = ({ id }: any) => {
  const dispatch = useAppDispatch()
  const { productOptionData, productList } = useAppSelector(state => state.admin)
  useEffect(() => {
  }, [productList])

  return (
    <div>
      {
        (productOptionData.length > 0 || (productList.length > 0 && !!id)) &&
        <div className="">
          <table className="w-full shadow-lg bg-white border-collapse">
            <thead>
              <tr>
                <th className='tableHeading'>Type</th>
                <th className='tableHeading'>Title</th>
                <th className='tableHeading'>Price</th>
                {!id &&
                  <th className='tableHeading'>Action</th>
                }
              </tr>
            </thead>
            <tbody>

              {
                !id &&
                productOptionData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="tableData">{item.optionType?.option}</td>
                      <td className="tableData">{item.itemName}</td>
                      <td className="tableData">{item.itemPrice}</td>
                      <td className="cursor-pointer tableData text-red-600"
                        onClick={() => dispatch(deleteProductOption(index))}>
                        <FaTrash />
                      </td>
                    </tr>
                  )
                })
              }

              {productList.length > 0 &&
                productList.map((item) => {
                  if (id === item._id) {
                    const { optionsList } = item
                    return (
                      <React.Fragment key={item._id}>
                        {optionsList?.length ?
                          optionsList?.map((option, index) => {
                            return (
                              <tr key={index}>
                                <td className="tableData">{option.optionType.option}</td>
                                <td className="tableData">{option.itemName}</td>
                                <td className="tableData">{option.itemPrice}</td>
                              </tr>
                            )
                          })
                          : <div className='text-red-600 text-center'>Data not found</div>
                        }
                      </React.Fragment>
                    )
                  }
                })
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default SelectedOptionsTable