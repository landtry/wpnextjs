import { cva, type VariantProps } from 'cva'
import Label from './Label'

/**
 * Styles
 */
const TextareaFieldStyles = cva(
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
export type TextareaFieldBasePropss = VariantProps<typeof TextareaFieldStyles>
export interface TextareaFieldProps extends TextareaFieldBasePropss {
  className: string
  label: string
  id: string
}

/**
 * Primary UI component for user interaction
 */
export default function TextareaField({
  label,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <textarea
        rows={4}
        id={id}
        {...props}
        className={TextareaFieldStyles({})}
      />
    </div>
  )
}
