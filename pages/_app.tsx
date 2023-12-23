import type { AppProps } from 'next/app'
import '@/app/globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import RootLayout from 'Components/admin/Layout'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  )
}