import { useMutation, gql } from '@apollo/client'

import {
  GravityFormsForm as GravityFormsFormType,
  FormField,
  FieldError,
} from '@/services/gravityFormsTypes'

import useGravityForm from '@/hooks/useGravityForm'
import GravityFormsField from './GravityFormsField'
import Button from '../buttons/Button'

const SUBMIT_FORM = gql`
  mutation SubmitForm($databaseId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: { id: $databaseId, fieldValues: $fieldValues }) {
      confirmation {
        message
      }
      errors {
        id
        message
      }
    }
  }
`

interface Props {
  form: GravityFormsFormType
}

export default function GravityFormsForm({ form }: Props) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM)
  const haveEntryId = Boolean(data?.submitGravityFormsForm?.entryId)
  const haveFieldErrors = Boolean(data?.submitGravityFormsForm?.errors?.length)
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors
  const defaultConfirmation = form.confirmations?.find(
    (confirmation) => confirmation?.isDefault
  )
  const formFields = form.formFields?.nodes || []
  const { state } = useGravityForm()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    console.log(state)

    submitForm({
      variables: {
        databaseId: form.databaseId,
        fieldValues: state,
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return []
    return data.submitGravityFormsForm.errors.filter(
      (error: FieldError) => error.id === id
    )
  }

  if (wasSuccessfullySubmitted) {
    return (
      <p>
        {defaultConfirmation?.message ||
          'Form successfully submitted - thank you.'}
      </p>
    )
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
      {formFields.map((field) => (
        <GravityFormsField
          key={field?.databaseId}
          field={field as FormField}
          fieldErrors={getFieldErrors(Number(field?.databaseId))}
        />
      ))}
      {error ? <p className="error-message">{error.message}</p> : null}
      <Button
        type="submit"
        disabled={loading}
        fullWidth
        size={'xl'}
        className="mt-4"
      >
        {form?.button?.text || 'Submit'}
      </Button>
    </form>
  )
}
