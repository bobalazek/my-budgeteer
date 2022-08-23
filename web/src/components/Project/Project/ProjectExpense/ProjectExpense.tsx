import { useEffect, useState } from 'react'

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandCircleDown as ExpandCircleDownIcon,
} from '@mui/icons-material'
import {
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
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
  const [anchorElement, setAnchorElement] = useState(null)
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
      <Grid container>
        <Grid sx={{ flexGrow: 1 }}>
          <TextField
            hiddenLabel
            fullWidth
            multiline
            variant="standard"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid>
          <IconButton
            onClick={(event) => setAnchorElement(event.currentTarget)}
          >
            <ExpandCircleDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElement}
            open={!!anchorElement}
            onClose={() => setAnchorElement(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorElement(null)
                setProjectExpenseModal({
                  open: true,
                  selectedProjectExpenseParentId: null,
                  selectedProjectExpense: projectExpense,
                })
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Edit</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorElement(null)
                setProjectExpenseModal({
                  open: true,
                  selectedProjectExpenseParentId: projectExpense.id,
                  selectedProjectExpense: null,
                })
              }}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Add child expense</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorElement(null)
                onDeleteButtonClick(projectExpense)
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Delete</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {projectExpense.description && (
        <Box>
          <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
            {projectExpense.description}
          </Typography>
        </Box>
      )}
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
