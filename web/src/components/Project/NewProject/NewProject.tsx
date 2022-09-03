import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectForm from 'src/components/Project/ProjectForm'
import { CREATE_PROJECT_MUTATION } from 'src/graphql/ProjectQueries'

const NewProject = () => {
  const [createProject, { loading, error }] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project created')
        navigate(routes.myProjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createProject({ variables: { input } })
  }

  return (
    <>
      <h2>New Project</h2>
      <ProjectForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default NewProject
