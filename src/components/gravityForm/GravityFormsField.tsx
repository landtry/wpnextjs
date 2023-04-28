import { FormField, FieldError } from '@/services/gravityFormsTypes'
import EmailField from '../gravityFormFields/EmailField'
import NameField from '../gravityFormFields/NameField'
import TextAreaField from '../gravityFormFields/TextAreaField'
import SelectField from '../gravityFormFields/SelectField'

interface Props {
  field: FormField
  fieldErrors: FieldError[]
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case 'NAME':
      return <NameField field={field} fieldErrors={fieldErrors} />
    case 'EMAIL':
      return <EmailField field={field} fieldErrors={fieldErrors} />
    case 'SELECT':
      return <SelectField field={field} fieldErrors={fieldErrors} />
    case 'TEXTAREA':
      return <TextAreaField field={field} fieldErrors={fieldErrors} />
    // case 'ADDRESS':
    //   return <AddressField field={field} fieldErrors={fieldErrors} />
    // case 'CHECKBOX':
    //   return <CheckboxField field={field} fieldErrors={fieldErrors} />
    // case 'DATE':
    //   return <DateField field={field} fieldErrors={fieldErrors} />
    // case 'PHONE':
    //   return <PhoneField field={field} fieldErrors={fieldErrors} />
    // case 'RADIO':
    //   return <RadioField field={field} fieldErrors={fieldErrors} />
    // case 'TEXT':
    //   return <TextField field={field} fieldErrors={fieldErrors} />
    // case 'TIME':
    //   return <TimeField field={field} fieldErrors={fieldErrors} />
    // case 'WEBSITE':
    //   return <WebsiteField field={field} fieldErrors={fieldErrors} />
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
