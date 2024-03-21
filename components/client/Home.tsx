'use client'
import React from 'react'
import DividerComp from '@/components/common/Divider'
import Starters from '@/components/client/Starters'
import IBack from '@/components/client/IBack'
import SomewhatLocal from '@/components/client/SomewhatLocal'
import SomewhatSooper from '@/components/client/SomewhatSooper'
import Layout from './Layout'

const Home = () => {
  return (
    <Layout>
      <div className=''>
        <div className="flex-grow border-t mb-12 w-2/3 ml-auto mr-auto border-gray-200"></div>
        <IBack />
        <DividerComp marginVertical='my-8' width='w-2/3' />
        <Starters />
        <DividerComp marginVertical='my-8' width='w-2/3' />
        <SomewhatLocal />
        <DividerComp marginVertical='my-8' width='w-2/3' />
        <SomewhatSooper />
      </div>
    </Layout>
  )
}

export default Home