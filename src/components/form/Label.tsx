import { ReactNode } from 'react'
import { cva, type VariantProps } from 'cva'

/**
 * Styles
 */
const LabelStyles = cva('mb-2 block text-sm font-semibold text-gray-900', {
  variants: {},
  compoundVariants: [{}],
  defaultVariants: {},
})

/**
 * Types
 */
export type LabelBasePropss = VariantProps<typeof LabelStyles>
export interface LabelProps extends LabelBasePropss {
  className?: string
  children?: ReactNode
}

/**
 * Primary UI component for user interaction
 */
export default function Label({ className, ...props }: LabelProps) {
  return <label className={LabelStyles({})} {...props} />
}
