import { TextField } from '@mui/material'

import { useQuery } from '@redwoodjs/web'

import { GET_CATEGORIES_QUERY } from 'src/graphql/CategoryQueries'

const ProjectFormCategoryField = ({ value, onChange }) => {
  const { data } = useQuery(GET_CATEGORIES_QUERY)

  const categories = data?.categories || []

  return (
    <>
      <TextField
        select
        fullWidth
        label="Category"
        size="small"
        variant="standard"
        value={value || '__NONE__'}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        SelectProps={{
          native: true,
        }}
      >
        {/* NOTE: Dirty hack with __NONE__, because it won't work with an empty string, whitout overflowing the label text */}
        <option value={'__NONE__'}>-- none --</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )
        })}
      </TextField>
    </>
  )
}

export default ProjectFormCategoryField
