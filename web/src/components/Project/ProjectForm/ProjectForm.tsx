import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

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
          Name
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
        <TextField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="description" className="rw-field-error" />

        <Label
          name="currencySymbol"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency symbol
        </Label>
        <SelectField
          name="currencySymbol"
          defaultValue={props.project?.currencySymbol}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          <option value="">Please select a symbol</option>
          <option value="$">$</option>
          <option value="€">€</option>
        </SelectField>
        <FieldError name="currencySymbol" className="rw-field-error" />

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
          name="categoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category id
        </Label>
        <TextField
          name="categoryId"
          defaultValue={props.project?.categoryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="categoryId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
