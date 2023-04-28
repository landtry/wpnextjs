import { gql } from '@apollo/client'

import {
  EmailField as EmailFieldType,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  EmailFieldValue,
} from '@/hooks/useGravityForm'
import TextField from '../form/TextField'

/**
 * GraphQl Queries
 */
export const EMAIL_INPUT_FIELDS = gql`
  fragment EmailInputFields on EmailInputProperty {
    id
    name
    autocompleteAttribute
    customLabel
    defaultValue
    label
    placeholder
  }
`

export const EMAIL_FIELD_FIELDS = gql`
  fragment EmailFieldFields on EmailField {
    databaseId
    label
    description
    cssClass
    isRequired
    placeholder
    inputs {
      ... on EmailInputProperty {
        ...EmailInputFields
      }
    }
  }
  ${EMAIL_INPUT_FIELDS}
`
/**
 * Types
 */
interface Props {
  field: EmailFieldType
  fieldErrors: FieldError[]
}

/**
 * Constants
 */
const DEFAULT_VALUE = ''

/**
 * Primary UI component for user interaction
 */
export default function EmailField({ field, fieldErrors }: Props) {
  // get field values
  const {
    databaseId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    visibility,
    placeholder,
  } = field
  const htmlId = `field_${databaseId}`

  // handle input state
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as EmailFieldValue | undefined
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE

  // handle input change
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    dispatch({
      type: ACTION_TYPES.updateEmailFieldValue,
      fieldValue: {
        id: databaseId,
        emailValues: {
          value: event.target.value,
        },
      },
    })
  }

  // Do not render if field is not visible
  if (visibility !== 'VISIBLE') return null

  // Render email field component
  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <TextField
        label={label}
        type="email"
        name={String(databaseId)}
        id={htmlId}
        placeholder={placeholder || ''}
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
