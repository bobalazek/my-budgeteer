import type { GetUser } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import User from 'src/components/User/User'
import { GET_USER_QUERY } from 'src/graphql/UserQueries'

export const QUERY = GET_USER_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }: CellSuccessProps<GetUser>) => {
  return <User user={user} />
}
