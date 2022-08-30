import { useCallback, useRef, useState } from 'react'

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandCircleDown as ExpandCircleDownIcon,
  Alarm as AlarmIcon,
  Sell as SellIcon,
  PriceChange as PriceChangeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material'
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { debounce } from 'lodash'
import { useSetRecoilState } from 'recoil'

import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'
import { ProjectExpenseType } from 'src/types/ProjectExpenseType'
import { ProjectType } from 'src/types/ProjectType'
import { isNumeric } from 'src/utils/helpers'

import { ProjectExpenseRecurringIntervalsMap } from './ProjectExpenseDialog/ProjectExpenseDialogRecurringIntervalField'

type ProjectExpensePropsType = {
  project: ProjectType
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

  const isStackValid =
    projectExpense.recurringInterval !== 'NONE' ||
    isNumeric(projectExpense.costRangeFrom) ||
    isNumeric(projectExpense.costRangeTo) ||
    isNumeric(projectExpense.costActual) ||
    (isNumeric(projectExpense.progressPercentage) &&
      projectExpense.progressPercentage > 0)

  return (
    <Box sx={sx}>
      <Grid container>
        <Grid item sx={{ flexGrow: 1 }}>
          {!project.permissions.allowExpensesUpdate && (
            <Typography>{name}</Typography>
          )}
          {project.permissions.allowExpensesUpdate && (
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
          )}
        </Grid>
        {(project.permissions.allowExpensesUpdate ||
          project.permissions.allowExpensesDelete) && (
          <Grid item>
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
              {project.permissions.allowExpensesUpdate && (
                <>
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
                </>
              )}
              {project.permissions.allowExpensesDelete && (
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
              )}
            </Menu>
          </Grid>
        )}
      </Grid>
      {projectExpense.description && (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          {projectExpense.description}
        </Typography>
      )}
      {isStackValid && (
        <Stack direction="row" spacing={2} sx={{ mt: '4px' }}>
          {projectExpense.recurringInterval !== 'NONE' && (
            <Box
              sx={{
                color: 'text.secondary',
              }}
            >
              <span>
                <AlarmIcon fontSize="small" />{' '}
              </span>
              <Box sx={{ display: 'inline', verticalAlign: 'top' }}>
                {
                  ProjectExpenseRecurringIntervalsMap[
                    projectExpense.recurringInterval
                  ]
                }
              </Box>
            </Box>
          )}
          {(isNumeric(projectExpense.costRangeFrom) ||
            isNumeric(projectExpense.costRangeTo)) && (
            <Box
              sx={{
                color: 'text.secondary',
              }}
            >
              <span>
                <PriceChangeIcon fontSize="small" />{' '}
              </span>
              <Box sx={{ display: 'inline', verticalAlign: 'top' }}>
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
              </Box>
            </Box>
          )}
          {isNumeric(projectExpense.costActual) && (
            <Box
              sx={{
                color: 'text.secondary',
              }}
            >
              <span>
                <SellIcon fontSize="small" />{' '}
              </span>
              <Box sx={{ display: 'inline', verticalAlign: 'top' }}>
                {projectExpense.costActual}
                {project.currencySymbol}
              </Box>
            </Box>
          )}
          {isNumeric(projectExpense.progressPercentage) &&
            projectExpense.progressPercentage > 0 && (
              <Box
                sx={{
                  color: 'text.secondary',
                }}
              >
                <span>
                  <TimelineIcon fontSize="small" />{' '}
                </span>
                <Box sx={{ display: 'inline', verticalAlign: 'top' }}>
                  {projectExpense.progressPercentage}%
                </Box>
              </Box>
            )}
        </Stack>
      )}
      {projectExpense.tags && projectExpense.tags.length > 0 && (
        <Box
          sx={{
            color: 'text.secondary',
            mt: '4px',
          }}
        >
          {projectExpense.tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            )
          })}
        </Box>
      )}
      {projectExpense.links && projectExpense.links.length > 0 && (
        <Box sx={{ mt: '4px' }}>
          {projectExpense.links.map((link, index) => {
            return (
              <Box key={index}>
                <Link href={link} target="_blank">
                  {link}
                </Link>
              </Box>
            )
          })}
        </Box>
      )}
      {projectExpense.children?.length > 0 && (
        <Box sx={{ ml: 3, mt: '4px', flexGrow: 1 }}>
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
