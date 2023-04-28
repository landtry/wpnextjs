import { gql } from '@apollo/client'
import { Controller, useFormContext } from 'react-hook-form'

import {
  EmailField as EmailFieldType,
  FieldError,
} from '@/services/gravityFormsTypes'

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

  // handle input state
  const {
    control,
    formState: { errors },
  } = useFormContext()

  // Do not render if field is not visible
  if (visibility !== 'VISIBLE') return null

  // Render email field component
  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <Controller
        name={String(label)}
        control={control}
        render={({ field }) => (
          <TextField
            label={label}
            type="email"
            // error={errors.first_name?.message}
            {...field}
          />
        )}
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
