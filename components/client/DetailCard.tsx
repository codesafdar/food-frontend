'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md"
import { FiHeart } from "react-icons/fi"
import Link from 'next/link'
import Accordion from './Accordion'
import DividerComp from '../common/Divider'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllProducts } from '@/redux/actions'
import { Circles, TailSpin } from 'react-loader-spinner'
import * as Yup from 'yup'
import Card from '../common/Card'
import SideDrawer from './SideDrawer'

interface IState {
  [key: string]: boolean
}

interface Iitem {
  itemName: string
  itemPrice: number
}

export interface ICard {
  variation: Iitem | null
  multiple: Iitem[] | null
  // noOfItems: number
}

interface IName {
  option: string
}

interface IOption {
  itemName?: string
  itemPrice?: string
  optionType: {
    isMultiple: boolean
    isRequired: boolean
    _id: string
    option: string
  }
}


const validationSchema = Yup.object({
  variation: Yup.object().required('Please select an item')
})

const initialValues: ICard = {
  variation: null,
  multiple: []
}

const DetailCard = () => {
  const [noOfItems, setNoOfItems] = useState(1)
  const [selected, setSelected] = useState(false)
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<IOption[]>([])
  const [showItems, setShowItems] = useState<IState>({
    variation: true,
    extra_topping: false,
  })

  const dispatch = useAppDispatch()
  const { productList, isLoading } = useAppSelector(state => state.admin)

  const params = useParams()
  const productID = params?.productID
  const selectedProduct: any = productList.length > 0 && productList.find(item => item?._id === productID)
  const optionsList = selectedProduct?.optionsList?.map(({ optionType }: IOption) => optionType)
  const names = optionsList?.map(({ option }: IName) => option)
  const uniqueOptions = (optionsList?.filter(({ option }: IName, index: number) => !names.includes(option, index + 1)))?.sort((a: IName, b: IName) => b.option.localeCompare(a.option))
  const remainingProducts: any = productList.length > 0 && productList.filter(item => item?._id !== productID && item?.category === selectedProduct?.category)


  const optionLowered = (str: string) => {
    return str?.toLowerCase()?.replace(' ', '_')
  }

  const submitFormData = (values) => {

  }


  const { setFieldValue, touched, handleSubmit, values, errors, handleBlur } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitFormData,
    validationSchema
  })

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])
  // debugger

  // select radio option
  const handleRadioBtn = (item: any): void => {
    const option = optionLowered(item?.optionType?.option)
    setSelected(true)
    if (option === 'variation') {
      setShowItems(prev =>
        ({ ...prev, variation: false, extra_topping: true }))
    }

    const data = {
      itemName: item.itemName,
      itemPrice: item.itemPrice
    }
    setFieldValue(option, data)

  }

  const handleCheckboxChange = (data: IOption) => {
    const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.itemName === data.itemName)
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox) => checkedCheckbox.itemName !== data.itemName
        )
      )
    } else {
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }
  }

  useEffect(() => {
    setFieldValue('multiple', checkedCheckboxes)
  }, [checkedCheckboxes])

  // calculate total price
  const totalPrice = () => {
    const { variation, multiple } = values
    let checkSum = 0
    const variationPrice = variation?.itemPrice || 0
    multiple?.forEach((item) => {
      checkSum += item.itemPrice
    })
    const price: number = (checkSum + variationPrice)
    return price * noOfItems
  }

  // add item
  const addItem = () => {
    if (selected) {
      setNoOfItems(pre => pre + 1)
    }
  }
  // remove the item
  const removeItem = () => {
    if (noOfItems > 1) {
      setNoOfItems(selectedProduct?.startingPrice && (pre => pre - 1))
    }
  }

  return (
    <>
      <div className='shadow-lg bg-white rounded-xl p-4 pr-12'>
        <div className='flex gap-2 items-center'>
          <div className=''>
            <Link href='/' className='cursor-pointer text-slate-300 text-[12px] font-normal'>
              Home
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className='text-slate-300 ' />
          </div>
          <div className='text-[12px] font-normal text-black'>{selectedProduct?.title}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-3 mt-8'>
            {
              selectedProduct?.image ?
                <div>
                  <Image src={selectedProduct?.image} height={400} width={400} className='rounded-lg' alt='product' />
                </div>
                :
                <div className='flex justify-center items-center'>
                  <Circles color='green' />
                </div>
            }
            <div className='col-span-2 ml-6 grid grid-rows-5'>
              <div className='row-span-4'>
                <div className='flex flex-col'>
                  <div className='flex justify-between items-center relative'>
                    <div className='text-[34px] font-bold text-black'>
                      {selectedProduct?.title}
                    </div>
                    <div className='p-2 rounded-3xl bg-gray-300 absolute right-5 top-2'>
                      <FiHeart className='text-xl' color='red' fill='red' />
                    </div>
                  </div>
                  <div className='text-base font-normal text-[#888888]'>
                    {selectedProduct?.description}
                  </div>
                </div>
                {
                  selectedProduct?.optionsList && selectedProduct.optionsList.length > 0 && (
                    <>
                      {
                        uniqueOptions && uniqueOptions.map((item: any, index: number) => (
                          <div key={index} className='mt-4'>
                            <Accordion
                              item={item}
                              lowerTitle={optionLowered(item?.option)}
                              values={values}
                              touched={touched[optionLowered(item.option) as keyof typeof touched]}
                              error={touched[optionLowered(item.option) as keyof typeof touched] ? errors : null}
                              showItems={showItems[optionLowered(item?.option)]}
                              setShowItems={(value) => setShowItems((prev) => ({ ...prev, [optionLowered(item?.option)]: value }))}
                            />
                            {
                              showItems[optionLowered(item?.option)] &&
                              selectedProduct?.optionsList && selectedProduct.optionsList.map((product: any) => {
                                const option = product?.optionType?.option
                                if (item?.option === option) {
                                  const price = product?.itemPrice
                                  const lowerOption = optionLowered(option)
                                  const isMultiple = item.isMultiple
                                  const productName = product?.itemName
                                  return (
                                    <React.Fragment key={productName}>
                                      {
                                        isMultiple ?
                                          <div
                                            className='flex justify-between items-center cursor-pointer px-3 my-3'>
                                            <div className="block min-h-[1.5rem]">
                                              <input
                                                className="mr-2"
                                                type="checkbox"
                                                value={'product'}
                                                onChange={() => handleCheckboxChange(product)}
                                                onBlur={handleBlur}
                                                name={optionLowered(option)}
                                              />
                                              <label
                                                className="mt-px inline-block ps-[0.15rem] text-[14px] text-black hover:cursor-pointer">
                                                {productName}
                                              </label>
                                            </div>
                                            <div className='text-black text-[14px]'>
                                              Rs. {price}.00
                                            </div>
                                          </div>
                                          :
                                          <div
                                            onClick={() => handleRadioBtn(product)}
                                            className='flex justify-between items-center cursor-pointer px-3 my-3'>
                                            <div className="block min-h-[1.5rem]">
                                              <input
                                                className="mr-2"
                                                type="radio"
                                                value={product}
                                                onChange={() => handleRadioBtn(product)}
                                                onBlur={handleBlur}
                                                checked={productName === values[lowerOption as keyof typeof values]?.itemName}
                                                name={optionLowered(option)}
                                              />
                                              <label
                                                className="mt-px inline-block ps-[0.15rem] text-[14px] text-black hover:cursor-pointer">
                                                {productName}
                                              </label>
                                            </div>
                                            <div className='text-black text-[14px]'>
                                              Rs. {price}.00
                                            </div>
                                          </div>
                                      }
                                      <DividerComp />
                                    </React.Fragment>
                                  )
                                }
                                return null;
                              })
                            }
                          </div>
                        ))
                      }
                    </>
                  )
                }

              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3 items-center'>
                  <div
                    onClick={() => removeItem()}
                    className='rounded-3xl cursor-pointer hover:bg-yellow-400 hover:text-black flex justify-center items-center text-[24px] bg-[#d40000] text-white w-[34px] h-[34px]'>
                    -
                  </div>
                  <div className='rounded-2xl text-black w-[52px] h-[36px] px-3 flex justify-center items-center text-[14px] border-2'>
                    {noOfItems}
                  </div>
                  <div
                    onClick={() => addItem()}
                    className='rounded-3xl cursor-pointer hover:bg-yellow-400 hover:text-black flex justify-center items-center text-[24px] bg-[#d40000] text-white w-[34px] h-[34px]'>
                    +
                  </div>
                </div>
                <button
                  type='submit'
                  className="rounded-full h-[42px] w-1/2 bg-[#d40000] font-bold text-white px-4 py-1 hover:bg-yellow-400 hover:text-black">
                  <div className='flex justify-between items-center'>
                    <div>Rs. {totalPrice() ? totalPrice() : (selectedProduct?.startingPrice || '00')}.00</div>
                    <div>
                      Add To Cart
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="relative flex mt-12 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <h3 className="flex-shrink text-lg font-bold mx-4 text-black">More in Somewhat Local</h3>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      <div className='my-6'>
        <Card category={selectedProduct?.category} remainingProducts={remainingProducts} />
      </div>
    </>
  )
}

export default DetailCard