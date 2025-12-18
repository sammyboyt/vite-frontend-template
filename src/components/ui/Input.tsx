import React from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  helpText?: string
  id?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      description,
      error,
      required = false,
      helpText,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    // Enhanced base input classes with better contrast
    const baseInputClasses =
      'flex h-12 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50'

    // Checkbox-specific styles with better visibility
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          className={cn(
            'h-5 w-5 rounded-lg border-2 border-gray-300 bg-white text-blue-600 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      )
    }

    // Radio button-specific styles with better visibility
    if (type === 'radio') {
      return (
        <input
          type="radio"
          className={cn(
            'h-5 w-5 rounded-full border-2 border-gray-300 bg-white text-blue-600 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      )
    }

    // For regular inputs with enhanced wrapper structure
    return (
      <div className="space-y-3">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-semibold leading-none',
              error ? 'text-red-600' : 'text-gray-800'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            className={cn(
              baseInputClasses,
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50',
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
        </div>

        {helpText && !error && (
          <p className="text-sm text-gray-600 flex items-start">
            <span className="mr-2 text-blue-500">💡</span>
            {helpText}
          </p>
        )}

        {description && !error && <p className="text-sm text-gray-600">{description}</p>}

        {error && (
          <p className="text-sm text-red-600 font-medium flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
