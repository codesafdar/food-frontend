import * as React from "react";
import Form from "./Form";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { IproductOptionData } from "@/redux/slices/adminSlice";
import { FaTrash } from "react-icons/fa";
import { deleteProductOption } from "@/redux/slices/adminSlice";

interface TabProps {
  color?: string
}

const Product = ({ color }: TabProps) => {
  const dispatch = useAppDispatch()
  const productOptionData: IproductOptionData[] = useAppSelector(state => state.admin.productOptionData)

  return (
    <>
      <div className="flex flex-col px-4">
        <div className="flex flex-col text-center justify-center items-center">
          <div className='text-3xl block font-bold p-3 text-pink-700'>Cheezious Admin</div>
          <div className='text-lg font-medium text-gray-600 p-2'>Add data</div>
        </div>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div>
                  <Form />
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded bg-white w-1/2 p-4">
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr>
                  <th className="">Type</th>
                  <th className="">Title</th>
                  <th className="">Price</th>
                </tr>
              </thead>
              <tbody className="">
                {
                  productOptionData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">{item.optionType}</td>
                        <td className="text-center">{item.itemName}</td>
                        <td className="text-center">{item.itemPrice}</td>
                        <td className="cursor-pointer text-center text-red-600" onClick={()=> dispatch(deleteProductOption(index))}> 
                          <FaTrash />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product
