import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import { Box, Fab } from '@mui/material'
import { useRecoilState } from 'recoil'

import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'
import { ProjectType } from 'src/types/ProjectType'

import ProjectExpenseDialog from './ProjectExpenseDialog'
import ProjectExpenses from './ProjectExpenses'

const ProjectExpensesSection = ({ project }: { project: ProjectType }) => {
  const [projectExpenseModal, setProjectExpenseModal] = useRecoilState(
    projectExpenseModalState
  )

  return (
    <>
      <Box sx={{ p: 2 }}>
        <ProjectExpenses project={project} />
      </Box>
      {project.permissions.allowExpensesCreate && (
        <>
          <Fab
            color="primary"
            onClick={() => {
              setProjectExpenseModal((prev) => ({
                open: !prev.open,
                selectedProjectExpense: null,
                selectedProjectExpenseParent: null,
              }))
            }}
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            {!projectExpenseModal.open && <AddIcon />}
            {projectExpenseModal.open && <CloseIcon />}
          </Fab>
          <ProjectExpenseDialog project={project} />
        </>
      )}
    </>
  )
}

export default ProjectExpensesSection
