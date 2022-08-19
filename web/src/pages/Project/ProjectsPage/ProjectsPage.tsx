import { Box } from '@mui/material'

import { Link } from '@redwoodjs/router'

import ProjectsCell from 'src/components/Project/ProjectsCell'

const ProjectsPage = () => {
  return (
    <Box p={2}>
      <div style={{ display: 'flex' }}>
        <Link
          to="/projects/new"
          className="rw-button rw-button-blue"
          style={{ marginLeft: 'auto', marginBottom: 10 }}
        >
          New Project
        </Link>
      </div>
      <ProjectsCell />
    </Box>
  )
}

export default ProjectsPage
