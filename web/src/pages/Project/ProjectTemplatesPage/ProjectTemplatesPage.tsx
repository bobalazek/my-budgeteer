import { Box, Grid, Typography, Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ProjectTemplatesCell from 'src/components/Project/ProjectTemplatesCell'

const ProjectTemplatesPage = () => {
  return (
    <>
      <MetaTags title="Project templates" />

      <Box p={2}>
        <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h2" sx={{ fontSize: 32 }}>
              Project Templates
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Button
                  href="#"
                  color="inherit"
                  variant="outlined"
                  component={Link}
                  to={routes.projects()}
                >
                  My projects
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProjectTemplatesCell />
      </Box>
    </>
  )
}

export default ProjectTemplatesPage
