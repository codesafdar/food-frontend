import React from 'react'
import Product from "@/components/admin/Product";

export async function getServerSideProps() {
  const isAuthenticated = false
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: 'admin/login'
      },
    };
  }

  // If authenticated, proceed with rendering the page
  return {
    props: {
  
    }, 
  };
}

const Admin = () => {
  return (
    <Product />
  )
}

export default Admin
