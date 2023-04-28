import { gql } from '@apollo/client'
import SelectInput from '@/components/form/SelectField'

import {
  SelectField as SelectFieldType,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from '@/hooks/useGravityForm'

/**
 * GraphQL Queries
 */
export const SELECT_FIELD_FIELDS = gql`
  fragment SelectFieldFields on SelectField {
    databaseId
    label
    description
    cssClass
    isRequired
    defaultValue
    choices {
      text
      value
    }
  }
`

/**
 * Types
 */
interface Props {
  field: SelectFieldType
  fieldErrors: FieldError[]
}

/**
 * Primary UI component for user interaction
 */
export default function SelectField({ field, fieldErrors }: Props) {
  // get field values
  const {
    choices,
    cssClass,
    databaseId,
    defaultValue,
    description,
    isRequired,
    label,
    type,
    visibility,
  } = field
  const htmlId = `field_${databaseId}`

  // handle input state
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || String(defaultValue)

  // handle input change
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    dispatch({
      type: ACTION_TYPES.updateSelectFieldValue,
      fieldValue: {
        id: databaseId,
        value: event.target.value,
      },
    })
  }

  // Do not render if field is not visible
  if (visibility !== 'VISIBLE') return null

  // Render email field component
  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId} className="sr-only">
        {label}
      </label>
      <SelectInput
        name={String(databaseId)}
        id={htmlId}
        required={Boolean(isRequired)}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {choices?.map((choice) => (
          <option key={choice?.value || ''} value={choice?.value || ''}>
            {choice?.text || ''}
          </option>
        ))}
      </SelectInput>
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
