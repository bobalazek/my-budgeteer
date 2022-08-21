import { SelectField } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { QUERY } from 'src/components/Category/CategoriesCell'

const CategoryField = (props) => {
  const { data } = useQuery(QUERY)

  const categories = data?.categories || []

  return (
    <SelectField emptyAs={null} {...props}>
      <option value="">-- none --</option>
      {categories.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        )
      })}
    </SelectField>
  )
}

export default CategoryField
