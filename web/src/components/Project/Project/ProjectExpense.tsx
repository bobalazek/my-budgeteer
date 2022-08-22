import { useEffect, useState } from 'react'

import { Delete as DeleteIcon } from '@mui/icons-material'
import { Grid, IconButton, TextField, Typography } from '@mui/material'
import { useDebounce } from 'usehooks-ts'

const ProjectExpense = ({
  projectExpense,
  index,
  level,
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
    <Grid container sx={sx}>
      <Grid item container>
        <Grid item sx={{ flexGrow: 1 }}>
          <TextField
            hiddenLabel
            fullWidth
            variant="standard"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            sx={{ ml: 1 }}
            onClick={() => onDeleteButtonClick(projectExpense)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      {projectExpense.description && (
        <Grid item>
          <Typography sx={{ color: 'text.secondary' }}>
            {projectExpense.description}
          </Typography>
        </Grid>
      )}
      {projectExpense.children?.length > 0 && (
        <Grid item sx={{ ml: 3, flexGrow: 1 }}>
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
        </Grid>
      )}
    </Grid>
  )
}

export default ProjectExpense
