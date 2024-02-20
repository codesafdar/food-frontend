'use client'
import Image from 'next/image';
import React from 'react'
import { TiDeleteOutline } from "react-icons/ti";

const ImageModal = () => {
  return (
    <div>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div
                // onClick={() => dispatch(setIsShowModal({ isShow: false }))}
                className="cornerDeleteBtn top-[-2px] right-[-2px]">
                <TiDeleteOutline />
              </div>
              <Image src={''} width={600} height={600} alt='image preview' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal