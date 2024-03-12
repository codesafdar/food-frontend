import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getCategories } from '@/redux/actions'
import { Link } from 'react-scroll'

const NavItems = () => {
  const dispatch = useAppDispatch()
  const { categoryList, isLoading } = useAppSelector(state => state.admin)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className='shadow-sm lg:px-24 top-20 left-0 fixed z-30 px-8 pt-4 flex items-center overflow-auto bg-white w-[100%]'>
      {categoryList.map((item) => (
        <Link
          activeStyle={{ color: 'gold' }}
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          to='/'
          key={item.category}
        >
          <div
            className='rounded-full text-nowrap cursor-pointer text-center bg-[#e5e5e5] mx-2 mb-4 hover:bg-yellow-400 px-4 py-2 w-auto text-black box-content text-[14px]'>
            {item?.category}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default NavItems