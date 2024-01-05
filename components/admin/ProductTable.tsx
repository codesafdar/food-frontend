import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { getAllProducts, deleteProduct } from '@/redux/actions'
import { TailSpin } from 'react-loader-spinner'
import { Oval } from 'react-loader-spinner'
import Image from 'next/image'
import { setIsShowModal, setProductData } from '@/redux/slices/adminSlice'
import { IFormInput } from './Form'

const ProductTable = () => {
  const { productList, getOneProductData, isLoading } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch()

  const handleDelete = (id: string | undefined) => {
    if (id) dispatch(deleteProduct(id))
  }

  const handleEdit = (item: IFormInput) => {
    dispatch(setProductData(item))
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div className="ml-auto mr-auto">
      {
        isLoading ?
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
          />
          :
          <table className="shadow-lg bg-white border-collapse">
            {
              productList.length > 0 &&
              <thead>
                <tr>
                  <th className="tableHeading">Category</th>
                  <th className="tableHeading">Title</th>
                  <th className="tableHeading">Base Price</th>
                  <th className="tableHeading">Description</th>
                  <th className="tableHeading">Image</th>
                  <th className="tableHeading">Options</th>
                  <th className="tableHeading">Actions</th>
                </tr>
              </thead>
            }
            <tbody>
              {
                productList.map((item, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-50 focus:bg-gray-300">
                      <td className="tableData px-8 py-4">{item.category}</td>
                      <td className="tableData px-8 py-4">{item?.title}</td>
                      <td className="tableData px-8 py-4">{item?.startingPrice}</td>
                      <td className="tableData px-8 py-4">{item?.description}</td>
                      <td className="tableData px-8 py-4">
                        {
                          item.image ?
                            <Image
                              src={item.image}
                              onClick={() => dispatch(setIsShowModal({
                                isShow: true,
                                showImage: item.image
                              }))}
                              className='cursor-pointer'
                              alt='image'
                              width={100}
                              height={100} />
                            : <TailSpin color='red' />
                        }
                      </td>
                      <td className="border px-4 py-4">
                        <button
                          onClick={() => dispatch(setIsShowModal({
                            isShow: true,
                            id: item._id
                          }))}
                          className='text-green-400'>Show list</button>
                      </td>
                      <td className="border px-8 py-4"
                      >
                        <span
                          className='text-red-600 cursor-pointer'
                          onClick={() => handleDelete(item._id)}>
                          Delete
                        </span> | <span className='cursor-pointer text-green-500'
                          onClick={() => handleEdit(item)}>
                          Edit
                        </span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      }
    </div>
  )
}

export default ProductTable