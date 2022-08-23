import { useEffect, useState } from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { useDebounce } from 'usehooks-ts'

import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'

const ProjectExpense = ({
  projectExpense,
  index,
  level,
  onDeleteButtonClick,
  onUpdate,
}) => {
  const [name, setName] = useState(projectExpense.name)
  const setProjectExpenseModal = useSetRecoilState(projectExpenseModalState)
  const debouncedName = useDebounce(name, 500)

  useEffect(() => {
    if (debouncedName === projectExpense.name) {
      return
    }

    onUpdate(projectExpense.id, {
      name: debouncedName,
      order: index,
    })
  }, [onUpdate, projectExpense, debouncedName, index])

  const onNewChildButton = () => {
    setProjectExpenseModal({
      open: true,
      selectedProjectExpenseParentId: projectExpense.id,
      selectedProjectExpense: null,
    })
  }

  const sx =
    level === 0
      ? {
          borderBottom: '1px solid #ddd',
          paddingBottom: '12px',
          marginBottom: '12px',
          width: '100%',
        }
      : {
          mt: 1,
        }

  return (
    <Box sx={sx}>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            hiddenLabel
            fullWidth
            multiline
            variant="standard"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Box>
      </Box>
      {projectExpense.description && (
        <Box>
          <Typography sx={{ color: 'text.secondary' }}>
            {projectExpense.description}
          </Typography>
        </Box>
      )}
      <Box textAlign="right" sx={{ mt: 1 }}>
        <Button color="primary" size="small" onClick={onNewChildButton}>
          New child
        </Button>
        <Button
          color="error"
          size="small"
          onClick={() => onDeleteButtonClick(projectExpense)}
        >
          Delete
        </Button>
      </Box>
      {projectExpense.children?.length > 0 && (
        <Box sx={{ ml: 3, flexGrow: 1 }}>
          {projectExpense.children?.map((child, childIndex) => {
            return (
              <ProjectExpense
                key={child.id}
                projectExpense={child}
                index={childIndex}
                level={level + 1}
                onDeleteButtonClick={onDeleteButtonClick}
                onUpdate={onUpdate}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default ProjectExpense
