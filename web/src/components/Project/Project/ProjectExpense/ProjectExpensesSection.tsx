import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import { Box, Fab } from '@mui/material'
import { useRecoilState } from 'recoil'

import { newProjectExpenseModalState } from 'src/state/NewProjectExpenseModalState'

import NewProjectExpenseForm from './NewProjectExpenseForm'
import ProjectExpenses from './ProjectExpenses'

const ProjectExpensesSection = ({ project }) => {
  const [newProjectExpenseModal, setNewProjectExpenseModal] = useRecoilState(
    newProjectExpenseModalState
  )

  return (
    <>
      <Box sx={{ p: 2 }}>
        <ProjectExpenses project={project} />
        {newProjectExpenseModal.open && (
          <NewProjectExpenseForm project={project} />
        )}
      </Box>
      <Fab
        color="primary"
        onClick={() => {
          setNewProjectExpenseModal((prev) => ({
            open: !prev.open,
            selectedProjectExpense: null,
          }))
        }}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {!newProjectExpenseModal.open && <AddIcon />}
        {newProjectExpenseModal.open && <CloseIcon />}
      </Fab>
    </>
  )
}

export default ProjectExpensesSection
