import { useEffect, useState } from 'react'

import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { useDebounce } from 'usehooks-ts'

const ProjectExpense = ({
  projectExpense,
  index,
  onDeleteButtonClick,
  onUpdate,
}) => {
  const [name, setName] = useState(projectExpense.name)
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

  return (
    <Box sx={{ mb: '4px' }} alignContent="center">
      <Box>
        <Box>
          <TextField
            hiddenLabel
            variant="standard"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <IconButton
            size="small"
            sx={{ ml: 1 }}
            onClick={() => onDeleteButtonClick(projectExpense.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        {projectExpense.description && (
          <Typography sx={{ color: 'text.secondary' }}>
            {projectExpense.description}
          </Typography>
        )}
      </Box>
      {projectExpense.children?.length > 0 && (
        <Box sx={{ ml: 2 }}>
          {projectExpense.children.map((child, childIndex) => {
            return (
              <ProjectExpense
                key={child.id}
                projectExpense={child}
                index={childIndex}
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
