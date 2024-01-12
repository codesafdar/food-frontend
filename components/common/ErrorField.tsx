import React from 'react'

interface IErrorProps {
  error: string
}

const ErrorField = ({ error }: IErrorProps) => {
  return (
    <div className="text-red-600 text-sm mt-1 text-center">{error}</div>
  )
}

export default ErrorField