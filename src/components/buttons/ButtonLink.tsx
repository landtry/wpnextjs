import { cva, type VariantProps } from 'cva'
import Link from 'next/link'
import { forwardRef } from 'react'

/**
 * Styles
 */
const ButtonStyles = cva('', {
  variants: {
    color: {
      cyan: '',
      white: '',
      gray: '',
    },
    fullWidth: {
      true: 'min-w-full',
      false: 'max-w-fit',
    },
    style: {
      solid:
        'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
      outline:
        'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
    },
    size: {
      sm: 'rounded-m px-2 py-1 text-xs',
      md: 'rounded-m px-2 py-1 text-sm',
      lg: 'rounded-lg px-2.5 py-1.5 text-sm',
      xl: 'rounded-lg px-3 py-2 text-sm',
      '2xl': 'rounded-lg px-3.5 py-2.5 text-sm',
    },
  },
  compoundVariants: [
    {
      color: 'cyan',
      style: 'solid',
      class:
        'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    },
    {
      color: 'white',
      style: 'solid',
      class:
        'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    },
    {
      color: 'gray',
      style: 'solid',
      class:
        'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
    },
    {
      color: ['cyan', 'white', 'gray'],
      style: 'outline',
      class:
        'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
    },
  ],
  defaultVariants: {
    color: 'cyan',
    fullWidth: false,
    size: 'md',
    style: 'solid',
  },
})

/**
 * Types
 */
export type ButtonBaseProps = VariantProps<typeof ButtonStyles>
export interface ButtonProps extends ButtonBaseProps {
  className?: string
  href: string
  children?: React.ReactNode
}

/**
 * Primary UI component for user interaction
 */
const ButtonLink = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { color, fullWidth, size, style, href, className, ...props }: ButtonProps,
  ref
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={ButtonStyles({ color, fullWidth, style, size, className })}
      {...props}
    />
  )
})

export default ButtonLink
