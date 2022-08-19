import { Box } from '@mui/material'

import ProjectCell from 'src/components/Project/ProjectCell'

type ProjectPageProps = {
  id: string
}

const ProjectPage = ({ id }: ProjectPageProps) => {
  return (
    <Box p={2}>
      {' '}
      <ProjectCell id={id} />
    </Box>
  )
}

export default ProjectPage
