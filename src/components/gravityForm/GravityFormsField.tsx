import { FormField, FieldError } from '@/services/gravityFormsTypes'
import AddressField from '../gravityFormFields/AddressField'
import CheckboxField from '../gravityFormFields/CheckboxField'
import DateField from '../gravityFormFields/DateField'
import EmailField from '../gravityFormFields/EmailField'
import NameField from '../gravityFormFields/NameField'
import PhoneField from '../gravityFormFields/PhoneField'
import RadioField from '../gravityFormFields/RadioField'
import TextAreaField from '../gravityFormFields/TextAreaField'
import TimeField from '../gravityFormFields/TimeField'
import WebsiteField from '../gravityFormFields/WebsiteField'
import SelectField from '../gravityFormFields/SelectField'
import TextField from '../gravityFormFields/TextField'

interface Props {
  field: FormField
  fieldErrors: FieldError[]
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case 'address':
      return <AddressField field={field} fieldErrors={fieldErrors} />
    case 'checkbox':
      return <CheckboxField field={field} fieldErrors={fieldErrors} />
    case 'date':
      return <DateField field={field} fieldErrors={fieldErrors} />
    case 'email':
      return <EmailField field={field} fieldErrors={fieldErrors} />
    case 'name':
      return <NameField field={field} fieldErrors={fieldErrors} />
    case 'phone':
      return <PhoneField field={field} fieldErrors={fieldErrors} />
    case 'radio':
      return <RadioField field={field} fieldErrors={fieldErrors} />
    case 'select':
      return <SelectField field={field} fieldErrors={fieldErrors} />
    case 'text':
      return <TextField field={field} fieldErrors={fieldErrors} />
    case 'textarea':
      return <TextAreaField field={field} fieldErrors={fieldErrors} />
    case 'time':
      return <TimeField field={field} fieldErrors={fieldErrors} />
    case 'website':
      return <WebsiteField field={field} fieldErrors={fieldErrors} />
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
