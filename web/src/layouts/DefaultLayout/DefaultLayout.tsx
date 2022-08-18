import { Toaster } from '@redwoodjs/web/toast'

import Footer from './Footer'
import Header from './Header'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default DefaultLayout
