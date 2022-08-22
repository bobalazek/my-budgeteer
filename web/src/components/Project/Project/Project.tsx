import { useState } from 'react'

import { Tabs, Tab, Typography, Box } from '@mui/material'

import NewProjectExpenseForm from './NewProjectExpenseForm'
import NewProjectVariableForm from './NewProjectVariableForm'
import ProjectExpenses from './ProjectExpenses'
import ProjectVariables from './ProjectVariables'

const Project = ({ project }) => {
  const [tab, setTab] = useState(0)

  return (
    <>
      <Typography variant="h3">{project.name}</Typography>
      {project.description && (
        <Typography sx={{ p: 2 }}>{project.description}</Typography>
      )}
      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab label="Expenses" />
        <Tab label="Variables" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ p: 2 }}>
          <ProjectExpenses project={project} />
          <NewProjectExpenseForm project={project} />
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ p: 2 }}>
          <ProjectVariables project={project} />
          <NewProjectVariableForm project={project} />
        </Box>
      )}
    </>
  )
}

export default Project
