import React from 'react'

interface IDivider {
  width?: string
  marginVertical?: string
  color?: string
}

const DividerComp = ({ width = 'w-full', marginVertical = 'my-0', color = 'gray-200' }: IDivider) => {
  return (
    <div className={`flex-grow border-t ${marginVertical} ${width} ml-auto mr-auto border-${color}`}></div>
  )
}

export default DividerComp