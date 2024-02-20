import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface IToast {
  type: string
  message: string | undefined
}

const ShowToast = ({ type, message }: IToast) => {
  const showToast = () => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
        break;
      case 'error':
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });
        break;
      default:
        // Default to displaying an info toast if no valid type is provided
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
    }
  };

  return (
    <>
      <ToastContainer  />
      {showToast()}
    </>
  )
}

export default ShowToast