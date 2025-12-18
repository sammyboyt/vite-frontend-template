/**
 * 🤖 AI AGENT GUIDANCE: MODAL COMPONENT IMPLEMENTATION
 *
 * REQUIRED: You must implement a Modal component that integrates with Redux useModal hook.
 * This demonstrates proper modal patterns with accessibility, focus management, and portal rendering.
 *
 * REQUIRED PROPS:
 * - modalId: string (for Redux integration)
 * - isOpen?: boolean (optional, can use Redux state)
 * - onClose?: () => void (close handler)
 * - title?: string (modal title)
 * - children: React.ReactNode (modal content)
 * - size?: 'sm' | 'md' | 'lg' | 'xl' (modal size)
 * - footer?: React.ReactNode (modal footer content)
 *
 * USAGE WITH REDUX (required pattern):
 * const { isOpen, open, close } = useModal('settings')
 * return (
 *   <Modal modalId="settings" title="Settings" footer={<Button>Save</Button>}>
 *     <SettingsForm />
 *   </Modal>
 * )
 *
 * USAGE WITH PROPS (alternative):
 * <Modal isOpen={showModal} onClose={closeModal} title="Confirm">
 *   <p>Are you sure?</p>
 * </Modal>
 *
 * IMPLEMENTATION REQUIREMENTS:
 * - React.createPortal for proper DOM positioning
 * - Focus trapping and management
 * - Keyboard navigation (Escape to close)
 * - Backdrop click to close
 * - Accessibility (ARIA attributes, focus management)
 * - Proper z-index layering
 * - Responsive design
 * - Animation transitions
 * - TypeScript strict typing
 */

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { RootState } from '../../store'
import { cn } from '../../utils/cn'

interface ModalProps {
  modalId: string
  isOpen?: boolean
  onClose?: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  className?: string
  footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  modalId,
  isOpen: propIsOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const modal = useSelector((state: RootState) => state.ui.modals[modalId])

  // Use prop isOpen if provided, otherwise use Redux state
  const isOpen = propIsOpen ?? modal?.isOpen ?? false

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !onClose) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdropClick && onClose) {
      onClose()
    }
  }

  // Focus management
  useEffect(() => {
    if (!isOpen) return

    // Focus the modal when it opens
    modalRef.current?.focus()

    // Trap focus within modal (basic implementation)
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements && focusableElements.length > 0) {
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              event.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              event.preventDefault()
            }
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      firstElement.focus()

      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl'
  }

  const modalClasses = cn(
    'bg-white rounded-2xl shadow-xl',
    sizeClasses[size],
    'w-full max-h-[90vh] overflow-hidden flex flex-col',
    'relative',
    'animate-in fade-in duration-200',
    className
  )

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div ref={modalRef} className={modalClasses} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(
          'overflow-y-auto',
          footer ? 'max-h-[calc(90vh-200px)]' : 'max-h-[calc(90vh-140px)]',
          title ? 'p-6' : 'p-0'
        )}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end items-center p-6 border-t border-gray-200 gap-3 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  // Use portal to render modal at document body level
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

// Simple modal wrapper that automatically manages state via Redux
interface SimpleModalProps extends Omit<ModalProps, 'modalId' | 'isOpen' | 'onClose'> {
  id: string
}

export const SimpleModal: React.FC<SimpleModalProps> = ({ id, ...props }) => {
  const { isOpen, close } = useModal(id)

  return <Modal modalId={id} isOpen={isOpen} onClose={close} {...props} />
}

// Import useModal here to avoid circular dependency
import { useModal } from '../../hooks/useModal'
