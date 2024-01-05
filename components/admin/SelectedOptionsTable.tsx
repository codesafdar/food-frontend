import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { FaTrash } from 'react-icons/fa'
import { deleteProductOption } from '@/redux/slices/adminSlice'

const SelectedOptionsTable = () => {
  const dispatch = useAppDispatch()
  const { productOptionData, isShowModal, productList } = useAppSelector(state => state.admin)
  useEffect(() => {
  }, [productList])

  return (
    <div>
      {
        (productOptionData.length > 0 || (productList.length > 0 && isShowModal.id)) &&
        <div className="">
          <table className="w-full shadow-lg bg-white border-collapse">
            <thead>
              <tr>
                <th className='tableHeading'>Type</th>
                <th className='tableHeading'>Title</th>
                <th className='tableHeading'>Price</th>
                {!isShowModal.id &&
                  <th className='tableHeading'>Action</th>
                }
              </tr>
            </thead>
            <tbody>

              {
                !isShowModal.id &&
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

              {
                productList?.map((item, index) => {
                  if (isShowModal.id === item._id) {
                    const { optionsList } = item
                    return (
                      <React.Fragment key={item._id}>
                        {
                          optionsList?.map((option, index) => {
                            return (
                              <tr key={index}>
                                <td className="tableData">{option.optionType.option}</td>
                                <td className="tableData">{option.itemName}</td>
                                <td className="tableData">{option.itemPrice}</td>
                              </tr>
                            )
                          })
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