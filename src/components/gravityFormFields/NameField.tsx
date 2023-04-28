import { gql } from '@apollo/client'

import {
  NameField as NameFieldType,
  NameInput,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  NameFieldValue,
} from '@/hooks/useGravityForm'

import TextField from '../form/TextField'

/**
 * GraphQL queries
 */
export const NAME_INPUT_FIELDS = gql`
  fragment NameInputFields on NameInputProperty {
    id
    name
    autocompleteAttribute
    customLabel
    defaultValue
    hasChoiceValue
    isHidden
    key
    label
    placeholder
  }
`

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    databaseId
    label
    description
    cssClass
    inputs {
      ... on NameInputProperty {
        ...NameInputFields
      }
    }
  }
  ${NAME_INPUT_FIELDS}
`

/**
 * Types
 */
interface Props {
  field: NameFieldType
  fieldErrors: FieldError[]
}

/**
 * Constants
 */
const DEFAULT_VALUE: NameInput = {}

/**
 * Primary UI component for user interaction
 */
export default function NameField({ field, fieldErrors }: Props) {
  // get field values
  const { cssClass, databaseId, description, inputs, label, type, visibility } =
    field
  const htmlId = `field_${databaseId}`

  // handle input state
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as NameFieldValue | undefined
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE

  // handle input change
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    const newNameValues = { ...nameValues, [name]: value }

    // Update field value with new name values
    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id: databaseId,
        nameValues: newNameValues,
      },
    })
  }

  // Filter inputs to get prefix, first, middle, last, and suffix inputs
  const prefixInput = inputs?.find((input) => input?.key === 'prefix')
  const otherInputs = inputs?.filter((input) => input?.key !== 'prefix') || []

  // Do not render if field is not visible
  if (visibility !== 'VISIBLE') return null

  // Render name field component
  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend className="sr-only">{label}</legend>

      {/* Render prefix input */}
      {prefixInput && !prefixInput.isHidden ? (
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${databaseId}_${prefixInput.key}`}
            autoComplete={prefixInput.autocompleteAttribute}
            value={nameValues.prefix || ''}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map((choice) => (
              <option key={choice?.value} value={String(choice?.value)}>
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${databaseId}_${prefixInput.key}`}>
            {prefixInput.label}
          </label>
        </>
      ) : null}

      <div className="flex justify-between gap-2">
        {/* Render text inputs for first, middle, last, and suffix */}
        {otherInputs.map((input) => {
          const id = input?.id
          const key = input?.key as keyof NameInput
          const inputLabel = input?.label || ''
          const placeholder = input?.placeholder || ''
          const isHidden = input?.isHidden || ''
          const autoCompleteAttribute = input?.autocompleteAttribute

          // Do not render if field is hidden
          if (isHidden) return null

          // Render input
          return (
            <div key={id} className="flex-1">
              <TextField
                label={inputLabel}
                type="text"
                name={String(key)}
                id={`input_${id}`}
                placeholder={placeholder}
                autoComplete={autoCompleteAttribute}
                value={nameValues?.[key] || ''}
                onChange={handleChange}
              />
            </div>
          )
        })}
      </div>

      {/* Render description and error messages */}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  )
}
