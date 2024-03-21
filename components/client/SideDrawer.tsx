import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import DividerComp from "../common/Divider";

const SideDrawer = ({ drawer, setDrawer }: any) => {

  const menuItems = [
    { icon: <TbTruckDelivery size={25} className="mr-4" />, text: "Orders" },
    { icon: <MdFavorite size={25} className="mr-4" />, text: "Favorites" },
    { icon: <FaWallet size={25} className="mr-4" />, text: "Wallet" },
    { icon: <MdHelp size={25} className="mr-4" />, text: "Help" },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-lg bg-white">
      <div
        className={
          drawer
            ? "fixed top-0 right-0 w-[400px] h-screen bg-white z-20 rounded-l-lg duration-300 flex flex-col"
            : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >



        <div className="p-4">
          <div className="flex justify-between mb-6">
            <div className="text-md font-semibold">
              Your Cart
            </div>
            <div>
              <AiOutlineClose
                onClick={() => setDrawer(!drawer)}
                size={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <DividerComp />

        </div>
        <div className="mt-auto">
          <DividerComp />
          <div className="p-6 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="">Subtotal</span>
              <span className="text-[#838f9b] text-sm">Rs. {55}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="">Delivery Charges</span>
              <span className="text-[#838f9b]">Rs. {'00'}.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="">Grand total</span>
              <span className="text-[#838f9b]">Rs. {'00'}.00</span>
            </div>
            <button className="bg-[#d40000] p-2 rounded-3xl text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;