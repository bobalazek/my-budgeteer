import { Box, Grid, Typography } from '@mui/material'

import { Link } from '@redwoodjs/router'
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
                <Link to="/projects" className="rw-button">
                  My projects
                </Link>
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