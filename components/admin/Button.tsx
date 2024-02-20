import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa"

interface ButtonProps {
  handleDelete: () => void;
  handleUpdate: () => void
}

const Button: React.FC<ButtonProps> = ({ handleDelete, handleUpdate }) => {
  return (
    <div className='flex space-x-3'>
      <div
        onClick={() => handleDelete()}
        className='text-red-600 cursor-pointer'>
        <FaTrash />
      </div>
      <div
        onClick={() => handleUpdate()}
        className='text-green-600 cursor-pointer'>
        <FaEdit />
      </div>
    </div>
  )
}

export default Button