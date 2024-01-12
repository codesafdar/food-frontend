import React, { ReactNode } from 'react'
import SideBar from '@/components/admin/SiderBar'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

interface ILayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: ILayoutProps) => {

  return (
    <Provider store={store}> 
    <div className="flex bg-gray-100 text-gray-900">
        <SideBar />
        <div className='w-full'>{children}</div>
      {/* <footer>Footer admin</footer> */}
    </div>
    </Provider>
  )
}

export default AdminLayout