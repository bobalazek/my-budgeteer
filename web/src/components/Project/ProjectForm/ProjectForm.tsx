import { useState, useEffect } from 'react'

import { Box, Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'

import { ProjectType } from 'src/types/ProjectType'

import ProjectFormCategoryField from './ProjectForm/ProjectFormCategoryField'
import ProjectFormCostEstimatedField from './ProjectForm/ProjectFormCostEstimatedField'
import ProjectFormCurrencySymbolField from './ProjectForm/ProjectFormCurrencySymbolField'
import ProjectFormDescriptionField from './ProjectForm/ProjectFormDescriptionField'
import ProjectFormIsPublicField from './ProjectForm/ProjectFormIsPublicField'
import ProjectFormIsTemplateField from './ProjectForm/ProjectFormIsTemplateField'
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
  const [categoryId, setCategoryId] = useState(null)
  const [isPublic, setIsPublic] = useState(false)
  const [isTemplate, setIsTemplate] = useState(false)

  useEffect(() => {
    setName(project?.name || '')
    setDescription(project?.description || '')
    setCurrencySymbol(project?.currencySymbol || '')
    setCategoryId(project?.categoryId || '')
    setIsPublic(project?.isPublic || false)
    setIsTemplate(project?.isTemplate || false)
  }, [project])

  const onSubmit = () => {
    onSave(
      {
        name,
        description,
        currencySymbol,
        costEstimated: costEstimated ? parseFloat(costEstimated) : null,
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
      <ProjectFormCostEstimatedField
        value={costEstimated}
        onChange={(value) => {
          setCostEstimated(value)
        }}
        currencySymbol={currencySymbol}
      />
      <ProjectFormCategoryField
        value={categoryId}
        onChange={(value) => {
          setCategoryId(value)
        }}
      />
      <ProjectFormIsPublicField
        value={isPublic}
        onChange={(value) => {
          setIsPublic(value)
        }}
      />
      <ProjectFormIsTemplateField
        value={isTemplate}
        onChange={(value) => {
          setIsTemplate(value)
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
