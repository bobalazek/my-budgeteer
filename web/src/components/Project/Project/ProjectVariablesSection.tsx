import { Box } from '@mui/material'

import NewProjectVariableForm from './NewProjectVariableForm'
import ProjectVariables from './ProjectVariables'

const ProjectVariablesSection = ({ project }) => {
  return (
    <Box sx={{ p: 2 }}>
      <ProjectVariables project={project} />
      <NewProjectVariableForm project={project} />
    </Box>
  )
}

export default ProjectVariablesSection
