import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Project/ProjectsCell'
import {
  CLONE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
} from 'src/graphql/ProjectQueries'

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const ProjectsList = ({ projects }) => {
  const refetchQueries = [{ query: QUERY }]
  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries,
    awaitRefetchQueries: true,
  })
  const [cloneProject] = useMutation(CLONE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project cloned')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries,
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (project) => {
    if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
      deleteProject({ variables: { id: project.id } })
    }
  }
  const onCloneClick = (project) => {
    const name = prompt(
      'What do you want to call the new project?',
      `${project.name} (clone)`
    )
    if (name) {
      cloneProject({
        variables: {
          id: project.id,
          input: {
            name,
          },
        },
      })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Public</th>
            <th>Template</th>
            <th>Cost estimated</th>
            <th>Category</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{truncate(project.name)}</td>
              <td>{truncate(project.description)}</td>
              <td>{project.isPublic ? 'Yes' : 'No'}</td>
              <td>{project.isTemplate ? 'Yes' : 'No'}</td>
              <td>
                {project.costEstimated && (
                  <>
                    {project.costEstimated} {project.currencySymbol}
                  </>
                )}
              </td>
              <td>{truncate(project.category?.name)}</td>
              <td>{timeTag(project.createdAt)}</td>
              <td>{timeTag(project.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.project({ id: project.id })}
                    title={'Show project ' + project.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProject({ id: project.id })}
                    title={'Edit project ' + project.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Clone project ' + project.id}
                    className="rw-button rw-button-small rw-button-blue"
                    onClick={() => onCloneClick(project)}
                  >
                    Clone
                  </button>
                  <button
                    type="button"
                    title={'Delete project ' + project.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(project)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectsList
