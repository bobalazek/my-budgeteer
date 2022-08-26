import { useCallback, useRef, useState } from 'react'

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
import { debounce } from 'lodash'
import { useSetRecoilState } from 'recoil'

import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'
import { ProjectExpenseType } from 'src/types/ProjectExpenseType'
import { isNumeric } from 'src/utils/helpers'

type ProjectExpensePropsType = {
  project: any // TODO
  projectExpense: ProjectExpenseType
  index: number
  level: number
  onDeleteButtonClick: (projectExpense: ProjectExpenseType) => void
  onUpdate: (id: string, input: any) => void
}

const ProjectExpense = ({
  project,
  projectExpense,
  index,
  level,
  onDeleteButtonClick,
  onUpdate,
}: ProjectExpensePropsType) => {
  const nameInputRef = useRef<HTMLInputElement>()
  const [name, setName] = useState(projectExpense.name)
  const [anchorElement, setAnchorElement] = useState(null)
  const setProjectExpenseModal = useSetRecoilState(projectExpenseModalState)
  const debouncedUpdate = useCallback(
    debounce(() => {
      // TODO. find the proper way to implement this
      onUpdate(projectExpense.id, {
        name: nameInputRef.current.value,
        order: index,
      })
    }, 500),
    []
  )

  const onNameChange = useCallback(
    (event) => {
      setName(event.target.value)

      debouncedUpdate()
    },
    [setName, debouncedUpdate]
  )

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
            inputRef={nameInputRef}
            value={name}
            onChange={onNameChange}
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
                  selectedProjectExpenseParent: null,
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
                  selectedProjectExpenseParent: projectExpense,
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
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          {projectExpense.description}
        </Typography>
      )}
      {projectExpense.recurringInterval !== 'NONE' && (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          Inverval: {projectExpense.recurringInterval}
        </Typography>
      )}
      {(isNumeric(projectExpense.costRangeFrom) ||
        isNumeric(projectExpense.costRangeTo)) && (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          <span>Cost: </span>
          {isNumeric(projectExpense.costRangeFrom) && (
            <span>
              from {projectExpense.costRangeFrom}
              {project.currencySymbol}{' '}
            </span>
          )}
          {isNumeric(projectExpense.costRangeTo) && (
            <span>
              to {projectExpense.costRangeTo}
              {project.currencySymbol}
            </span>
          )}
        </Typography>
      )}
      {isNumeric(projectExpense.costActual) && (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          Actual cost: {projectExpense.costActual}
        </Typography>
      )}
      {isNumeric(projectExpense.progressPercentage) && (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          Progress: {projectExpense.progressPercentage}%
        </Typography>
      )}
      {projectExpense.children?.length > 0 && (
        <Box sx={{ ml: 3, flexGrow: 1 }}>
          {projectExpense.children?.map((child, childIndex) => {
            return (
              <ProjectExpense
                key={child.id}
                project={project}
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
