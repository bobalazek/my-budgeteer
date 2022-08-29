import type { FindProjects } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Projects from 'src/components/Project/Projects'
import { GET_PROJECTS_QUERY } from 'src/graphql/ProjectQueries'

export const QUERY = GET_PROJECTS_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No projects yet. '}
      <Link to={routes.newProject()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ projects }: CellSuccessProps<FindProjects>) => {
  return <Projects projects={projects} />
}
