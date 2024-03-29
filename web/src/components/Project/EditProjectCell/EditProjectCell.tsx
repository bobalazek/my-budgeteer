import type { GetProject } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectForm from 'src/components/Project/ProjectForm'
import {
  GET_PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION,
} from 'src/graphql/ProjectQueries'

export const QUERY = GET_PROJECT_QUERY

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<GetProject>) => {
  const [updateProject, { loading, error }] = useMutation(
    UPDATE_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project updated')
        navigate(routes.myProjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProject({ variables: { id, input } })
  }

  return (
    <>
      <h2>Edit Project &quot;{project.name}&quot;</h2>
      <ProjectForm
        project={project}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </>
  )
}
