import { gql } from '@apollo/client'

import {
  TextAreaField as TextAreaFieldType,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from '@/hooks/useGravityForm'
import TextareaField from '../form/TextareaField'

export const TEXT_AREA_FIELD_FIELDS = gql`
  fragment TextAreaFieldFields on TextAreaField {
    databaseId
    label
    description
    cssClass
    isRequired
  }
`

interface Props {
  field: TextAreaFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ''

export default function TextAreaField({ field, fieldErrors }: Props) {
  const { databaseId, type, label, description, cssClass, isRequired } = field
  const htmlId = `field_${databaseId}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || DEFAULT_VALUE

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    dispatch({
      type: ACTION_TYPES.updateTextAreaFieldValue,
      fieldValue: {
        id: databaseId,
        value: event.target.value,
      },
    })
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId} className="sr-only">
        {label}
      </label>
      <TextareaField
        name={String(databaseId)}
        label={label}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={handleChange}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  )
}
