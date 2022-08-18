import { Link } from '@redwoodjs/router'

import UsersCell from 'src/components/User/UsersCell'

const UsersPage = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Link
          to="/admin/users/new"
          className="rw-button rw-button-blue"
          style={{ marginLeft: 'auto', marginBottom: 10 }}
        >
          New User
        </Link>
      </div>
      <UsersCell />
    </>
  )
}

export default UsersPage
