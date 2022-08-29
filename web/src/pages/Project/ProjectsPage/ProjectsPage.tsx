import { Box, Grid, Typography } from '@mui/material'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ProjectsCell from 'src/components/Project/ProjectsCell'

const ProjectsPage = () => {
  return (
    <>
      <MetaTags title="My Projects" />

      <Box p={2}>
        <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h2" sx={{ fontSize: 32 }}>
              My Projects
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <Link to="/project-templates" className="rw-button">
                  Templates
                </Link>
              </Grid>
              <Grid item>
                <Link to="/projects/new" className="rw-button rw-button-blue">
                  New Project
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProjectsCell />
      </Box>
    </>
  )
}

export default ProjectsPage
