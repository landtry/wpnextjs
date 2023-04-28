import { GravityFormsForm as GravityFormsFormType } from '@/services/gravityFormsTypes'
import { GravityFormProvider } from '@/hooks/useGravityForm'
import GravityFormsForm from './GravityFormsForm'
import { useForm, FormProvider } from 'react-hook-form'

interface Props {
  form: GravityFormsFormType
}

export default function GravityForm(props: Props) {
  const methods = useForm()

  return (
    <GravityFormProvider>
      <FormProvider {...methods}>
        <GravityFormsForm {...props} />
      </FormProvider>
    </GravityFormProvider>
  )
}
