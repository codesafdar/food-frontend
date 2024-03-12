import React from 'react'
import Header from './Header'
import Footer from './Footer'

export interface RootLayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <div className='h-[100vh] overflow-auto relative lg:px-32 px-8 bg-[#f8f9fa]'>
      <Header />
      <div className='mt-28'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout