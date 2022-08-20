import { Box } from '@mui/material'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ProjectsCell from 'src/components/Project/ProjectsCell'

const ProjectsPage = () => {
  return (
    <>
      <MetaTags title="Projects" />

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
    </>
  )
}

export default ProjectsPage
