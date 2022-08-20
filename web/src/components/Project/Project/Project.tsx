import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProjectMutation($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const Project = ({ project }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project deleted')
      navigate(routes.projects())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete project ' + id + '?')) {
      deleteProject({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Project &quot;{project.name}&quot; Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{project.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{project.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{project.description}</td>
            </tr>
            <tr>
              <th>Is public</th>
              <td>{project.isPublic ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th>Cost estimated</th>
              <td>
                {project.costEstimated && (
                  <>
                    {project.costEstimated} {project.currencySymbol}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{project.category?.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(project.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(project.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.projects()} className="rw-button">
          Back
        </Link>
        <Link
          to={routes.editProject({ id: project.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(project.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Project
