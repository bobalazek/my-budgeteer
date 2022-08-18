import { Toaster } from '@redwoodjs/web/toast'

import Header from './Header'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>Copyright &copy; 2022 My Budgeteer</footer>
    </>
  )
}

export default DefaultLayout
