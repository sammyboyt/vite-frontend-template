import React, { createContext, useContext, useState, useCallback } from 'react'
import { cn } from '../../utils/cn'

interface TabsContextType {
  activeTab: string
  setActiveTab: (tabId: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  defaultTab?: string
  children: React.ReactNode
  className?: string
  onTabChange?: (tabId: string) => void
}

export const Tabs: React.FC<TabsProps> = ({
  defaultTab,
  children,
  className,
  onTabChange
}) => {
  const [activeTab, setActiveTabState] = useState(defaultTab || '')

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabState(tabId)
    onTabChange?.(tabId)
  }, [onTabChange])

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-start border-b border-gray-200 bg-gray-50 rounded-t-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  tabId: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  tabId,
  children,
  className,
  disabled = false
}) => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component')
  }

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === tabId

  return (
    <button
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors',
        'border-b-2',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'text-blue-600 border-blue-600 bg-white'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
        className
      )}
      onClick={() => !disabled && setActiveTab(tabId)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabId}`}
      id={`tab-${tabId}`}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  tabId: string
  children: React.ReactNode
  className?: string
}

export const TabsContent: React.FC<TabsContentProps> = ({
  tabId,
  children,
  className
}) => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component')
  }

  const { activeTab } = context
  const isActive = activeTab === tabId

  if (!isActive) return null

  return (
    <div
      className={cn('mt-4', className)}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      id={`tabpanel-${tabId}`}
    >
      {children}
    </div>
  )
}

// Hook for using tabs context
export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component')
  }
  return context
}

// Compound component pattern - alternative API
interface TabsCompoundProps extends Omit<TabsProps, 'children'> {
  tabs: Array<{
    id: string
    label: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
  }>
  variant?: 'default' | 'pills' | 'underline'
}

export const TabsCompound: React.FC<TabsCompoundProps> = ({
  tabs,
  defaultTab,
  variant = 'default',
  onTabChange,
  className
}) => {
  const variantClasses = {
    default: '',
    pills: 'bg-gray-100 p-1 rounded-lg',
    underline: 'border-b border-gray-200'
  }

  return (
    <Tabs defaultTab={defaultTab || tabs[0]?.id} onTabChange={onTabChange} className={className}>
      <TabsList className={variantClasses[variant]}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            tabId={tab.id}
            disabled={tab.disabled}
            className={cn(
              variant === 'pills' && 'rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm',
              variant === 'underline' && 'border-b-2 border-transparent data-[state=active]:border-blue-600'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} tabId={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
