import { Typography } from '@mui/material'

import NewProjectExpenseForm from './NewProjectExpenseForm'
import NewProjectVariableForm from './NewProjectVariableForm'
import ProjectExpenses from './ProjectExpenses'
import ProjectVariables from './ProjectVariables'

const Project = ({ project }) => {
  return (
    <>
      <Typography variant="h2" sx={{ mb: 4 }}>
        {project.name}
      </Typography>
      {project.description && (
        <Typography sx={{ p: 2 }}>{project.description}</Typography>
      )}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Variables
      </Typography>
      <ProjectVariables project={project} />
      <NewProjectVariableForm project={project} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Expenses
      </Typography>
      <ProjectExpenses project={project} />
      <NewProjectExpenseForm project={project} />
    </>
  )
}

export default Project
