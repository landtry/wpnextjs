import { SelectField, TextField } from '@/components/Fields'
import { Controller, useFormContext } from 'react-hook-form'

export default function Register({ field, fieldErrors }) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field
  const htmlId = `field_${formId}_${id}`

  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name="first_name"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'First name is required',
        },
        maxLength: {
          value: 30,
          message: 'Must be no more than least 30 characters',
        },
      }}
      render={({ field }) => (
        <TextField
          label={label}
          required={isRequired}
          placeholder={placeholder}
          error={errors.first_name?.message}
          {...field}
        />
      )}
    />
  )
}

// export function GravityFormField({ field, fieldErrors }) {
//   switch (field.type) {
//     case "address":
//       return <AddressField field={field} fieldErrors={fieldErrors} />;
//     case "checkbox":
//       return <CheckboxField field={field} fieldErrors={fieldErrors} />;
//     case "date":
//       return <DateField field={field} fieldErrors={fieldErrors} />;
//     case "email":
//       return <EmailField field={field} fieldErrors={fieldErrors} />;
//     case "multiselect":
//       return <MultiSelectField field={field} fieldErrors={fieldErrors} />;
//     case "name":
//       return <NameField field={field} fieldErrors={fieldErrors} />;
//     case "phone":
//       return <PhoneField field={field} fieldErrors={fieldErrors} />;
//     case "radio":
//       return <RadioField field={field} fieldErrors={fieldErrors} />;
//     case "select":
//       return <SelectField field={field} fieldErrors={fieldErrors} />;
//     case "text":
//       return <TextField field={field} fieldErrors={fieldErrors} />;
//     case "textarea":
//       return <TextAreaField field={field} fieldErrors={fieldErrors} />;
//     case "time":
//       return <TimeField field={field} fieldErrors={fieldErrors} />;
//     case "website":
//       return <WebsiteField field={field} fieldErrors={fieldErrors} />;
//     default:
//       return <p>{`Field type not supported: ${field.type}.`}</p>;
//   }
// }
