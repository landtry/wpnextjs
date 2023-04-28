import { gql } from '@apollo/client'
import React from 'react'

import {
  AddressField as AddressFieldType,
  AddressInput,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  AddressFieldValue,
} from '@/hooks/useGravityForm'

export const ADDRESS_INPUT_FIELDS = gql`
  fragment AddressInputFields on AddressInputProperty {
    id
    name
    label
    key
    isHidden
    placeholder
    defaultValue
    customLabel
    autocompleteAttribute
  }
`

export const ADDRESS_FIELD_FIELDS = gql`
  fragment AddressFieldFields on AddressField {
    databaseId
    label
    description
    cssClass
    inputs {
      ... on AddressInputProperty {
        ...AddressInputFields
      }
    }
  }
  ${ADDRESS_INPUT_FIELDS}
`

interface Props {
  field: AddressFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE: AddressInput = {}

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: 'address-line1',
  lineTwo: 'address-line2',
  city: 'address-level2',
  state: 'address-level1',
  country: 'country-name',
}

export default function AddressField({ field, fieldErrors }: Props) {
  const { databaseId, type, label, description, cssClass, inputs } = field
  const htmlId = `field_${databaseId}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.databaseId === databaseId
  ) as AddressFieldValue | undefined
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newAddressValues = { ...addressValues, [name]: value }

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        databaseId,
        addressValues: newAddressValues,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {inputs?.map((input) => {
        const key = input?.key as keyof AddressInput
        const inputLabel = input?.label || ''
        const placeholder = input?.placeholder || ''
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${databaseId}_${databaseId}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ''}
              onChange={handleChange}
            />
            <label htmlFor={`input_${databaseId}_${id}_${key}`}>
              {inputLabel}
            </label>
          </div>
        )
      })}
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
