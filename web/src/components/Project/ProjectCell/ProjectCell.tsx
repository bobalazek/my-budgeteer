import type { GetProject } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Project from 'src/components/Project/Project'
import { GET_PROJECT_QUERY } from 'src/graphql/ProjectQueries'

export const QUERY = GET_PROJECT_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Project not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<GetProject>) => {
  return <Project project={project} />
}
