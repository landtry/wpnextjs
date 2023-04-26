import { cva, type VariantProps } from 'cva'

/**
 * Styles
 */
const ButtonStyles = cva(
  'block font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
  {
    variants: {
      color: {
        primary:
          'bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:outline-cyan-600',
        secondary:
          'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600',
      },
      fullWidth: {
        true: 'min-w-full',
        false: 'min-w-fit',
      },
      size: {
        sm: 'rounded px-2 py-1 text-xs',
        md: 'rounded px-2 py-1 text-sm',
        lg: 'rounded-md px-2.5 py-1.5 text-sm',
        xl: 'rounded-md px-3 py-2 text-sm',
        '2xl': 'rounded-md px-3.5 py-2.5 text-sm',
      },
    },
    compoundVariants: [{}],
    defaultVariants: {
      color: 'primary',
      fullWidth: false,
      size: 'md',
    },
  }
)

/**
 * Types
 */
export type ButtonBasePropss = VariantProps<typeof ButtonStyles>
export interface ButtonProps extends ButtonBasePropss {
  className: string
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  color,
  fullWidth,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={ButtonStyles({ color, fullWidth, size, className })}
      {...props}
    />
  )
}
