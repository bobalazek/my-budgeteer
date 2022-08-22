import { useState } from 'react'

import { Tabs, Tab, Typography } from '@mui/material'

import ProjectExpensesSection from './ProjectExpensesSection'
import ProjectVariablesSection from './ProjectVariablesSection'

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
      {tab === 0 && <ProjectExpensesSection project={project} />}
      {tab === 1 && <ProjectVariablesSection project={project} />}
    </>
  )
}

export default Project
