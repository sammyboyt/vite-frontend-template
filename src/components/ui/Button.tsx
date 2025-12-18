import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-solid transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
        primary:
          'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white shadow-md hover:shadow-lg',
        secondary:
          'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 hover:from-violet-200 hover:to-purple-200 shadow-md hover:shadow-lg',
        ghost: 'text-violet-600 hover:bg-violet-50 hover:text-violet-700 rounded-2xl',
        link: 'text-violet-600 underline-offset-4 hover:underline hover:text-violet-700',
        success:
          'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl',
        warning:
          'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl',
        danger:
          'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
      },
      size: {
        default: 'h-11 px-6 py-2.5 rounded-md',
        sm: 'h-9 px-4 py-2 rounded-md text-sm',
        lg: 'h-12 px-8 py-3 rounded-md text-base',
        icon: 'h-10 w-10 rounded-md',
        xs: 'h-8 px-3 py-1.5 rounded-md text-xs',
        xl: 'h-14 px-10 py-4 rounded-md text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  isLoading?: boolean
  iconName?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  iconSize?: number
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loading = false,
      isLoading = false,
      iconName,
      icon,
      iconPosition = 'left',
      iconSize,
      fullWidth = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    // Handle loading aliases
    const isLoadingState = loading || isLoading

    // Handle icon aliases
    const effectiveIconName = icon || iconName

    // Icon size mapping based on button size
    const iconSizeMap: Record<string, number> = {
      xs: 12,
      sm: 14,
      default: 16,
      lg: 18,
      xl: 20,
      icon: 16
    }

    const calculatedIconSize = iconSize || iconSizeMap[size || 'default'] || 16

    // Loading spinner
    const LoadingSpinner = () => (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    const renderIcon = () => {
      if (!effectiveIconName) return null
      // For now, just return null since we don't have the Icon component
      // In a real implementation, you'd import and use an icon library
      return null
    }

    const renderFallbackButton = () => (
      <button
        className={cn(buttonVariants({ variant, size, className }), fullWidth && 'w-full')}
        ref={ref}
        disabled={disabled || isLoadingState}
        {...props}
      >
        {isLoadingState && <LoadingSpinner />}
        {effectiveIconName && iconPosition === 'left' && renderIcon()}
        {children}
        {effectiveIconName && iconPosition === 'right' && renderIcon()}
      </button>
    )

    // When asChild is true, merge icons into the child element
    if (asChild) {
      if (!children || React.Children.count(children) !== 1) {
        return renderFallbackButton()
      }

      const child = React.Children.only(children)

      if (!React.isValidElement(child)) {
        return renderFallbackButton()
      }

      const content = (
        <>
          {isLoadingState && <LoadingSpinner />}
          {effectiveIconName && iconPosition === 'left' && renderIcon()}
          {child.props.children}
          {effectiveIconName && iconPosition === 'right' && renderIcon()}
        </>
      )

        const clonedChild = React.cloneElement(child, {
          className: cn(
            buttonVariants({ variant, size, className }),
            fullWidth && 'w-full',
            (child.props as any).className
          ),
          disabled: disabled || isLoadingState || (child.props as any).disabled,
          children: content
        } as any)

      return (
        <Comp ref={ref} {...props}>
          {clonedChild}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), fullWidth && 'w-full')}
        ref={ref}
        disabled={disabled || isLoadingState}
        {...props}
      >
        {isLoadingState && <LoadingSpinner />}
        {effectiveIconName && iconPosition === 'left' && renderIcon()}
        {children}
        {effectiveIconName && iconPosition === 'right' && renderIcon()}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export default Button
