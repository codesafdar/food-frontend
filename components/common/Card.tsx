import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllProducts } from '@/redux/actions'
import { TailSpin } from 'react-loader-spinner'
import Image from 'next/image'
import DividerComp from './Divider'
import { FiHeart } from "react-icons/fi";

interface ICard {
  title: string
}

const Card = ({ title }: ICard) => {

  const dispatch = useAppDispatch()
  const { productList, isLoading } = useAppSelector(state => state.admin)
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      {
        isLoading ?
          <TailSpin color='green' />
          :
          <div className=''>
            <div className='text-2xl text-black font-bold mb-4'>{title}</div>
            <div className='grid grid-cols-2 pr-3 lg:grid-cols-4 gap-4 overflow-auto w-full'>
              {
                productList.map((product) => {
                  if (product.category === title) {
                    return (
                      <div
                      key={product?._id}
                       className="w-full cursor-pointer relative rounded-[14px] bg-slate-200 shadow-lg p-[10px] hover:outline-yellow-400 m-2 hover:outline hover:outline-2"
                      >
                        <Image
                          width={226}
                          height={226}
                          className="w-full rounded-xl"
                          src={product?.image}
                          alt="cheezious" />
                        <div className='rounded-3xl bg-gray-300 p-2 absolute right-5 top-4'>
                          <FiHeart className='text-xl' color='red' fill='red' />
                        </div>
                        <div className="py-1 mt-1 text-gray-700">
                          <div className="font-bold text-[12px] lg:text-lg mb-1 text-center">{product?.title}</div>
                          <p className="text-[12px] md:text-[14px] line-clamp-2">
                            {product?.description}
                          </p>
                        </div>
                        <DividerComp width='full' marginVertical='1' />
                        <div className="px-6 pt-4 flex flex-col items-center text-center">
                          <div className="inline-block md:px-3 py-1 text-[12px] md:text-sm md:font-semibold text-red-600 mr-2 mb-2">
                            from Rs. {product?.startingPrice}.00</div>
                          <button className='bg-red-600 hover:text-black hover:bg-yellow-500 rounded-2xl w-full md:w-1/2 p-2 text-white text-[12px] md:text-base'>
                            Add to Card
                          </button>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
      }
    </>
  )
}

export default Card