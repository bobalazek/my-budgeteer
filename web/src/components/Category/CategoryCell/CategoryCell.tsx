import type { GetCategory } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Category from 'src/components/Category/Category'
import { GET_CATEGORY_QUERY } from 'src/graphql/CategoryQueries'

export const QUERY = GET_CATEGORY_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Category not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ category }: CellSuccessProps<GetCategory>) => {
  return <Category category={category} />
}
