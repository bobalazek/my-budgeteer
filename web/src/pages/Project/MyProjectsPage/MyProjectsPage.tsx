import { Box, Grid, Typography, Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ProjectsCell from 'src/components/Project/ProjectsCell'

const MyProjectsPage = () => {
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
                <Button
                  href="#"
                  color="inherit"
                  variant="outlined"
                  component={Link}
                  to={routes.projectTemplates()}
                >
                  Templates
                </Button>
              </Grid>
              <Grid item>
                <Button
                  href="#"
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to={routes.newProject()}
                >
                  New Project
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProjectsCell />
      </Box>
    </>
  )
}

export default MyProjectsPage
