import { useForm, FormProvider } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'
import useGravityForm from '../hooks/useGravityForm'
import GravityFormsField from './GravityFormsField'

const SUBMIT_FORM = gql`
  mutation submitForm() {
    submitGfForm(
      input: {
        id: "2"
        fieldValues: { id: 1, nameValues: { first: "test2", last: "test2" } }
      }
    ) {
      clientMutationId
      resumeUrl
      confirmation {
        message
      }
      errors {
        message
      }
    }
  }
`

export function GravityFormsForm({ form }) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM)
  const haveEntryId = Boolean(data?.submitGravityFormsForm?.entryId)
  const haveFieldErrors = Boolean(data?.submitGravityFormsForm?.errors?.length)
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors
  const defaultConfirmation = form.confirmations?.find(
    (confirmation) => confirmation?.isDefault
  )
  const formFields = form.formFields?.nodes || []
  const { state } = useGravityForm()

  function handleSubmit(event) {
    event.preventDefault()
    if (loading) return

    submitForm({
      variables: {
        formId: form.formId,
        fieldValues: state,
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  function getFieldErrors(id) {
    if (!haveFieldErrors) return []
    return data.submitGravityFormsForm.errors.filter((error) => error.id === id)
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
    <form method="post" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <GravityFormsField
          key={field?.id}
          field={field}
          fieldErrors={getFieldErrors(Number(field?.id))}
        />
      ))}
      {error ? <p className="error-message">{error.message}</p> : null}
      <button type="submit" disabled={loading}>
        {form?.button?.text || 'Submit'}
      </button>
    </form>
  )
}

export default function GravityForm({ form }) {
  const methods = useForm()
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM)
  const haveEntryId = Boolean(data?.submitGravityFormsForm?.entryId)
  const haveFieldErrors = Boolean(data?.submitGravityFormsForm?.errors?.length)
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors
  const defaultConfirmation = form.confirmations?.find(
    (confirmation) => confirmation?.isDefault
  )
  const formFields = form.formFields?.nodes || []

  function onSubmit(data) {
    console.log(data)
    // event.preventDefault()
    // if (loading) return

    // submitForm({
    //   variables: {
    //     formId: form.formId,
    //     fieldValues: state,
    //   },
    // }).catch((error) => {
    //   console.error(error)
    // })
  }

  function getFieldErrors(id) {
    if (!haveFieldErrors) return []
    return data.submitGravityFormsForm.errors.filter((error) => error.id === id)
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <GravityFormsField
            key={field?.id}
            field={field}
            fieldErrors={getFieldErrors(Number(field?.id))}
          />
        ))}

        {error ? <p className="error-message">{error.message}</p> : null}

        <button type="submit" disabled={loading}>
          {form?.button?.text || 'Submit'}
        </button>
      </form>
    </FormProvider>
  )
}
