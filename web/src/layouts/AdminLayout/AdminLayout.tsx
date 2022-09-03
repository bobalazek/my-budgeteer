import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header" style={{}}>
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.admin()} className="rw-link">
            Admin
          </Link>
        </h1>
        <div style={{ display: 'flex' }}>
          <Link to={routes.home()} className="rw-button">
            Back to website
          </Link>
          <Link to={routes.adminUsers()} className="rw-button">
            Users
          </Link>
          <Link to={routes.adminCategories()} className="rw-button">
            Categories
          </Link>
        </div>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default AdminLayout
