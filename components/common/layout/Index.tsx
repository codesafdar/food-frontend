import AdminLayout from "./AdminLayout"
import ClientLayout from "./ClientLayout"
import AuthLayout from "./AuthLayout"


export const getLayout = ({ Component, pageProps, pathname }: any) => {
  if (pathname.startsWith('/admin')) {
    return <AdminLayout >
      <Component />
    </AdminLayout>
  }

  else if (pathname.startsWith('/client')) {
    return <ClientLayout {...pageProps}>
      <Component />
    </ClientLayout>
  }

  else if (pathname.startsWith('/auth')) {
    return <AuthLayout {...pageProps}> <Component /> </AuthLayout>
  }
}