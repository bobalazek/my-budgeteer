import type { GetProjectTemplates } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Projects from 'src/components/Project/Projects'
import { GET_PROJECT_TEMPLATES_QUERY } from 'src/graphql/ProjectQueries'

export const QUERY = GET_PROJECT_TEMPLATES_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">No templates yet</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  projectTemplates,
}: CellSuccessProps<GetProjectTemplates>) => {
  return <Projects projects={projectTemplates} />
}
