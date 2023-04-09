import clsx from 'clsx'
import { forwardRef, useState } from 'react'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  )
}

export function ErrorMessage({ children }) {
  return (
    <p className="mb-2 block text-sm font-semibold text-red-800">{children}</p>
  )
}

export const TextField = forwardRef(function TextField(
  { id, label, type = 'text', className, required, error, ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <Label id={id}>{required ? `${label} *` : label}</Label>}
      <input
        ref={ref}
        type={type}
        className={clsx(
          formClasses,
          error ? '!border-red-700  !ring-red-700' : ''
        )}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
})

export const SelectField = forwardRef(function SelectField(
  { id, label, className, required, children, ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <Label id={id}>{required ? `${label} *` : label}</Label>}
      <select {...props} className={clsx(formClasses, 'pr-8')}>
        {children}
      </select>
    </div>
  )
})

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
