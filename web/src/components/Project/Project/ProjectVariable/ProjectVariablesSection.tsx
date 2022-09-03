import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import { Box, Fab } from '@mui/material'
import { useRecoilState } from 'recoil'

import { projectVariableModalState } from 'src/state/ProjectVariableModalState'

import ProjectVariableDialog from './ProjectVariableDialog'
import ProjectVariables from './ProjectVariables'

const ProjectVariablesSection = ({ project }) => {
  const [projectVariableModal, setProjectVariableModal] = useRecoilState(
    projectVariableModalState
  )

  return (
    <>
      <Box sx={{ p: 2 }}>
        <ProjectVariables project={project} />
        {project.permissions.allowVariablesCreate && (
          <>
            <Fab
              color="primary"
              onClick={() => {
                setProjectVariableModal((prev) => ({
                  open: !prev.open,
                  selectedProjectVariable: null,
                }))
              }}
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
              {!projectVariableModal.open && <AddIcon />}
              {projectVariableModal.open && <CloseIcon />}
            </Fab>
            <ProjectVariableDialog project={project} />
          </>
        )}
      </Box>
    </>
  )
}

export default ProjectVariablesSection
