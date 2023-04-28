import { cva, type VariantProps } from 'cva'
import { ChangeEventHandler } from 'react'
import Label from './Label'

/**
 * Styles
 */
const TextFieldStyles = cva(
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm',
  {
    variants: {},
    compoundVariants: [{}],
    defaultVariants: {},
  }
)

/**
 * Types
 */
export type TextFieldBasePropss = VariantProps<typeof TextFieldStyles>
export interface TextFieldProps extends TextFieldBasePropss {
  className?: string
  label?: string | null
  id: string
  type?: string
  placeholder?: string
  name?: string
  autoComplete?: string
  value?: string
  required?: boolean
  onChange?: ChangeEventHandler
}

/**
 * Primary UI component for user interaction
 */
export default function TextField({
  label,
  id,
  type = 'text',
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={TextFieldStyles({})} />
    </div>
  )
}
