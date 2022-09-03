import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  CLONE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  GET_PROJECTS_QUERY,
} from 'src/graphql/ProjectQueries'
import { ProjectType } from 'src/types/ProjectType'

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

const ProjectsList = ({ projects }: { projects: ProjectType[] }) => {
  const refetchQueries = [{ query: GET_PROJECTS_QUERY }]
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
  const onCloneClick = async (project) => {
    const name = prompt(
      'What do you want to call the new project?',
      `${project.name} (clone)`
    )
    if (name) {
      await cloneProject({
        variables: {
          id: project.id,
          input: {
            name,
          },
        },
      })
      navigate(routes.myProjects())
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Public</TableCell>
            <TableCell>Template</TableCell>
            <TableCell>Cost estimated</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Updated at</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{truncate(project.name)}</TableCell>
              <TableCell>{truncate(project.description)}</TableCell>
              <TableCell>{project.isPublic ? 'Yes' : 'No'}</TableCell>
              <TableCell>{project.isTemplate ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {project.costEstimated && (
                  <>
                    {project.costEstimated}
                    {project.currencySymbol}
                  </>
                )}
              </TableCell>
              <TableCell>{truncate(project.category?.name)}</TableCell>
              <TableCell>{timeTag(project.createdAt)}</TableCell>
              <TableCell>{timeTag(project.updatedAt)}</TableCell>
              <TableCell>
                <nav className="rw-table-actions">
                  {project.permissions.allowRead && (
                    <Button
                      size="small"
                      color="inherit"
                      component={Link}
                      to={routes.project({ id: project.id })}
                    >
                      Show
                    </Button>
                  )}
                  {project.permissions.allowUpdate && (
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={routes.editProject({ id: project.id })}
                    >
                      Edit
                    </Button>
                  )}
                  {project.permissions.allowClone && (
                    <Button
                      size="small"
                      href="#"
                      color="secondary"
                      onClick={(event) => {
                        event.preventDefault()
                        onCloneClick(project)
                      }}
                    >
                      Clone
                    </Button>
                  )}
                  {project.permissions.allowDelete && (
                    <Button
                      size="small"
                      href="#"
                      color="error"
                      onClick={(event) => {
                        event.preventDefault()
                        onDeleteClick(project)
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </nav>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectsList
