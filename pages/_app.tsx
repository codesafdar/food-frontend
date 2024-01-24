import type { AppProps } from 'next/app'
import '@/app/globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/common/layout/AdminLayout'
import ClientLayout from '@/components/common/layout/ClientLayout'
import AuthLayout from '@/components/common/layout/AuthLayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const getLayout = (pathname: string) => {
    if (pathname.startsWith('/admin')) {
      return <AdminLayout {...pageProps}>
        <Component />
      </AdminLayout>
    }
    else if (pathname.startsWith('/client')) {
      return <ClientLayout {...pageProps}>
        <Component />
      </ClientLayout>
    }
    else return <AuthLayout {...pageProps}> <Component /> </AuthLayout>
  }

  const Layout = getLayout(router.pathname)

  return (
    <Provider store={store}>
      {Layout}
    </Provider>
  )
}