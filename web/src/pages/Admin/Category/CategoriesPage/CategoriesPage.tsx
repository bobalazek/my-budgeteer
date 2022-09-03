import { Link, routes } from '@redwoodjs/router'

import CategoriesCell from 'src/components/Category/CategoriesCell'

const CategoriesPage = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Link
          to={routes.newAdminCategory()}
          className="rw-button rw-button-blue"
          style={{ marginLeft: 'auto', marginBottom: 10 }}
        >
          New Category
        </Link>
      </div>
      <CategoriesCell />
    </>
  )
}

export default CategoriesPage
