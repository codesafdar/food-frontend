import * as React from "react";
import Form from "./Form";
import ProductTable from "./ProductTable";

interface TabProps {
  color?: string
}

const Product = ({ color }: TabProps) => {

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
        </div>
        <ProductTable />
      </div>
    </>
  );
};

export default Product
