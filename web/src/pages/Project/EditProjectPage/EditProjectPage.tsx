import { Box } from '@mui/material'

import EditProjectCell from 'src/components/Project/EditProjectCell'

type ProjectPageProps = {
  id: string
}

const EditProjectPage = ({ id }: ProjectPageProps) => {
  return (
    <Box p={2}>
      <EditProjectCell id={id} />
    </Box>
  )
}

export default EditProjectPage
