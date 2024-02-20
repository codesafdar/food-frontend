'use client'
import React, { useEffect, useState } from 'react'
import { deleteAdmin, getAllUsers, updateAdmin } from '@/redux/actions'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { adminData, resetToast } from '@/redux/slices/adminSlice'
import { TailSpin } from 'react-loader-spinner'
import Button from './Button'
import Modal from './Modal'
import CreateAdmin, { ICreateAdmin } from './CreateAdmin'

const UsersAdmin = () => {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<ICreateAdmin>(
    {
      fName: '',
      lName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
      _id: ''
    }
  )
  const dispatch = useAppDispatch()
  const { users, isLoading, isError, isSuccess } = useAppSelector(state => state.admin)

  const handleDelete = (id: string) => {
    dispatch(deleteAdmin(id))
  }

  const handleUpdate = (item: any) => {
    setShowModal(true)
    if (item?._id) {
      setData(item)
    }
  }

  function convertToTitleCase(inputString: string) {
    const words = inputString.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(' ')
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div className='flex justify-center flex-col'>
      <div className='text-pink-500 font-bold text-lg text-center mb-4'>
        Users
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <CreateAdmin isEdit={true} data={data} setShowModal={setShowModal} />
      </Modal>
      <div className='border my-4 ml-auto mr-auto shadow-md flex flex-col w-1/2 rounded-lg'>
        {isLoading
          ?
          <div className='ml-auto mr-auto my-4'>
            <TailSpin color='green' />
          </div>
          :
          <table className="">
            {
              users.length > 0 &&
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Role</th>
                  <th className="tableHeading">Actions</th>
                </tr>
              </thead>
            }
            <tbody>
              {
                users.map((item: adminData) => {
                  return (
                    <tr key={item._id} className='mb-4  hover:bg-gray-50 focus:bg-gray-300'>
                      <td className='tableData py-4'>
                        {item.fName}
                        <span>{` ${item.lName}`}</span>
                      </td>
                      <td className="tableData  py-4">{convertToTitleCase(item.role)}</td>
                      <td className="tableData py-4">
                        <Button
                          handleDelete={() => handleDelete(item._id)}
                          handleUpdate={() => handleUpdate(item)}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default UsersAdmin