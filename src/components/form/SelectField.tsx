import { cva, type VariantProps } from 'cva'
import Label from './Label'

/**
 * Styles
 */
const SelectFieldStyles = cva(
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm pr-8',
  {
    variants: {},
    compoundVariants: [{}],
    defaultVariants: {},
  }
)

/**
 * Types
 */
export type SelectFieldBasePropss = VariantProps<typeof SelectFieldStyles>
export interface SelectFieldProps extends SelectFieldBasePropss {
  className: string
  label: string
  id: string
  type: string
}

/**
 * Primary UI component for user interaction
 */
export default function SelectField({
  label,
  id,
  type = 'text',
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={SelectFieldStyles({})} />
    </div>
  )
}
