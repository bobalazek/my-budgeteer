import getSymbolFromCurrency from 'currency-symbol-map'
import currenciesMap from 'currency-symbol-map/map'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
  SelectField,
  TextAreaField,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import CategoryField from './CategoryField'

const currencies = Object.keys(currenciesMap).sort((a: string) => {
  return ['USD', 'EUR', 'AUD', 'CAD'].includes(a) ? -1 : 1
})

const ProjectForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.project?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name*
        </Label>
        <TextField
          name="name"
          defaultValue={props.project?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextAreaField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="description" className="rw-field-error" />

        <Label
          name="currencySymbol"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency symbol*
        </Label>
        <SelectField
          name="currencySymbol"
          defaultValue={props.project?.currencySymbol || '$'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {currencies.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency} ({getSymbolFromCurrency(currency)})
              </option>
            )
          })}
        </SelectField>
        <FieldError name="currencySymbol" className="rw-field-error" />

        <Label
          name="costEstimated"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cost estimated
        </Label>
        <TextField
          name="costEstimated"
          defaultValue={props.project?.costEstimated}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />
        <FieldError name="costEstimated" className="rw-field-error" />

        <Label
          name="isPublic"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is public
        </Label>
        <CheckboxField
          name="isPublic"
          defaultChecked={props.project?.isPublic}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="isPublic" className="rw-field-error" />

        <Label
          name="isTemplate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is template
        </Label>
        <CheckboxField
          name="isTemplate"
          defaultChecked={props.project?.isTemplate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="isTemplate" className="rw-field-error" />

        <Label
          name="categoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>
        <CategoryField
          name="categoryId"
          defaultValue={props.project?.categoryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="categoryId" className="rw-field-error" />

        <div className="rw-button-group">
          <Link to={routes.myProjects()} className="rw-button">
            Back
          </Link>
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
