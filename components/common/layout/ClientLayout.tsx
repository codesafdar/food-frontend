import React, { ReactNode } from 'react'

interface IClientProps {
  children: ReactNode
}

const ClientLayout: React.FC<IClientProps> = ({ children }) => {
  return (
    <div>ClientLayout</div>
  )
}

export default ClientLayout