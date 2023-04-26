import { gql } from '@apollo/client'

import {
  DateField as DateFieldType,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from '@/hooks/useGravityForm'

export const DATE_INPUT_FIELDS = gql`
  fragment DateInputFields on DateInputProperty {
    id
    placeholder
    label
    defaultValue
    customLabel
    autocompleteAttribute
  }
`

export const DATE_FIELD_FIELDS = gql`
  fragment DateFieldFields on DateField {
    databaseId
    label
    description
    cssClass
    isRequired
    placeholder
    inputs {
      ... on DateInputProperty {
        ...DateInputFields
      }
    }
  }
  ${DATE_INPUT_FIELDS}
`

interface Props {
  field: DateFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ''

export default function DateField({ field, fieldErrors }: Props) {
  const {
    id,
    databaseId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field
  const htmlId = `field_${databaseId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || DEFAULT_VALUE

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="date"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateDateFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
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
