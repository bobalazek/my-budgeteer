import { useState, useEffect } from 'react'

import { Box, Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'

import { ProjectType } from 'src/types/ProjectType'

import ProjectFormCategoryField from './ProjectForm/ProjectFormCategoryField'
import ProjectFormCurrencySymbolField from './ProjectForm/ProjectFormCurrencySymbolField'
import ProjectFormDescriptionField from './ProjectForm/ProjectFormDescriptionField'
import ProjectFormNameField from './ProjectForm/ProjectFormNameField'

const ProjectForm = ({
  project,
  loading,
  onSave,
}: {
  project: ProjectType
  loading: boolean
  onSave: (
    data: Record<string, string | number | boolean>,
    projectId?: string
  ) => void
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [currencySymbol, setCurrencySymbol] = useState('')
  const [costEstimated, setCostEstimated] = useState(null)
  const [isPublic, setIsPublic] = useState(false)
  const [isTemplate, setIsTemplate] = useState(false)
  const [categoryId, setCategoryId] = useState(null)

  useEffect(() => {
    setName(project?.name || '')
    setDescription(project?.description || '')
    setCurrencySymbol(project?.currencySymbol || '')
    setCategoryId(project?.categoryId || '')
  }, [project])

  const onSubmit = () => {
    onSave(
      {
        name,
        description,
        currencySymbol,
        costEstimated,
        isPublic,
        isTemplate,
        categoryId: categoryId || null,
      },
      project?.id
    )
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { my: 1 },
      }}
    >
      <ProjectFormNameField
        value={name}
        onChange={(value) => {
          setName(value)
        }}
      />
      <ProjectFormDescriptionField
        value={description}
        onChange={(value) => {
          setDescription(value)
        }}
      />
      <ProjectFormCurrencySymbolField
        value={currencySymbol}
        onChange={(value) => {
          setCurrencySymbol(value)
        }}
      />
      <ProjectFormCategoryField
        value={categoryId}
        onChange={(value) => {
          setCategoryId(value)
        }}
      />
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          size="small"
          color="inherit"
          component={Link}
          to={routes.myProjects()}
        >
          Back
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={loading}
          onClick={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default ProjectForm
