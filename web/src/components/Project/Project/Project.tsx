import { useState } from 'react'

import { Tabs, Tab, Typography, Grid, Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'

import ProjectExpensesSection from './ProjectExpense/ProjectExpensesSection'
import ProjectVariablesSection from './ProjectVariable/ProjectVariablesSection'

const Project = ({ project }) => {
  const [tab, setTab] = useState('expenses')

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h2" sx={{ fontSize: 32 }}>
            {project.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            href="#"
            color="inherit"
            variant="outlined"
            component={Link}
            to={routes.myProjects()}
          >
            Back to Projects
          </Button>
        </Grid>
      </Grid>

      {project.description && (
        <Typography sx={{ p: 2 }}>{project.description}</Typography>
      )}
      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab label="Expenses" value="expenses" />
        <Tab label="Variables" value="variables" />
      </Tabs>
      {tab === 'expenses' && <ProjectExpensesSection project={project} />}
      {tab === 'variables' && <ProjectVariablesSection project={project} />}
    </>
  )
}

export default Project
