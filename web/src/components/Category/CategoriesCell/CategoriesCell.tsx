import type { GetCategories } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Categories from 'src/components/Category/Categories'
import { GET_CATEGORIES_QUERY } from 'src/graphql/CategoryQueries'

export const QUERY = GET_CATEGORIES_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No categories yet. '}
      <Link to={routes.newCategory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ categories }: CellSuccessProps<GetCategories>) => {
  return <Categories categories={categories} />
}
