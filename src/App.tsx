import React from 'react'
import { Button, Input, Modal, SimpleModal, Tabs, TabsList, TabsTrigger, TabsContent, TabsCompound, ToastContainer } from './components'
import { useModal, useTheme, useNotifications, useIsMobile, useLocalStorage, useDebounce } from './hooks'
import { ErrorBoundaryWrapper } from './components/error-boundary'
import { Sun, Moon, Bell, Settings, User, Menu, X } from 'lucide-react'

function App() {
  const { isOpen: isSettingsOpen, open: openSettings, close: closeSettings } = useModal('settings')
  const { isOpen: isUserModalOpen, open: openUserModal, close: closeUserModal } = useModal('user-profile')
  const { theme, toggleTheme, resolvedTheme } = useTheme()
  const { success, error, warning, info } = useNotifications()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebar-open', false)

  // Demo component that might throw an error
  const ErrorDemo = () => {
    const [shouldError, setShouldError] = React.useState(false)

    if (shouldError) {
      throw new Error('This is a demo error!')
    }

    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h3 className="font-medium text-red-800 mb-2">Error Boundary Demo</h3>
        <p className="text-red-600 text-sm mb-3">
          Click the button below to trigger an error and test the Error Boundary.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setShouldError(true)}
        >
          Trigger Error
        </Button>
      </div>
    )
  }

  return (
    <ErrorBoundaryWrapper>
      <div className={`min-h-screen transition-colors duration-300 ${
        resolvedTheme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
      }`}>
        {/* Header */}
        <header className={`border-b transition-colors duration-300 ${
          resolvedTheme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    resolvedTheme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <h1 className="ml-4 text-xl font-bold">Advanced Template</h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-10 h-10"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => success('Success!', 'This is a success notification')}
                  className="w-10 h-10"
                >
                  <Bell className="w-5 h-5" />
                </Button>

                {/* Settings */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openSettings()}
                  className="w-10 h-10"
                >
                  <Settings className="w-5 h-5" />
                </Button>

                {/* User Profile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openUserModal()}
                  className="w-10 h-10"
                >
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className={`w-64 transition-colors duration-300 ${
              resolvedTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-r`}>
              <div className="p-4">
                <nav className="space-y-2">
                  <a href="#" className={`block px-3 py-2 rounded-lg transition-colors ${
                    resolvedTheme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    Dashboard
                  </a>
                  <a href="#" className={`block px-3 py-2 rounded-lg transition-colors ${
                    resolvedTheme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    Projects
                  </a>
                  <a href="#" className={`block px-3 py-2 rounded-lg transition-colors ${
                    resolvedTheme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    Settings
                  </a>
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Advanced Frontend Template</h1>
                <p className={`text-lg ${
                  resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Modern React + TypeScript + Tailwind CSS with advanced features
                </p>
              </div>

              {/* Demo Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Components Demo */}
                <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                  <h2 className="text-2xl font-semibold mb-6">UI Components</h2>

                  <div className="space-y-6">
                    {/* Buttons */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Buttons</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="danger">Danger</Button>
                      </div>
                    </div>

                    {/* Button Sizes */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="xs">XS</Button>
                        <Button size="sm">SM</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">LG</Button>
                        <Button size="xl">XL</Button>
                      </div>
                    </div>

                    {/* Form Inputs */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Form Inputs</h3>
                      <div className="space-y-4">
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="Enter your email"
                          helpText="We'll never share your email with anyone else."
                        />
                        <Input
                          label="Full Name"
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Demo */}
                <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                  <h2 className="text-2xl font-semibold mb-6">Advanced Features</h2>

                  <div className="space-y-6">
                    {/* Notification Buttons */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Toast Notifications</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => success('Success!', 'Operation completed successfully')}
                        >
                          Success
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => error('Error!', 'Something went wrong')}
                        >
                          Error
                        </Button>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => warning('Warning!', 'Please check your input')}
                        >
                          Warning
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => info('Info', 'Here is some information')}
                        >
                          Info
                        </Button>
                      </div>
                    </div>

                    {/* Modal Buttons */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Modals</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => openSettings()}
                        >
                          Settings Modal
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openUserModal()}
                        >
                          User Profile
                        </Button>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Theme System</h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Current theme: <span className="font-medium">{theme}</span>
                        </p>
                        <p className="text-sm">
                          Resolved theme: <span className="font-medium">{resolvedTheme}</span>
                        </p>
                        <p className="text-sm">
                          Mobile: <span className="font-medium">{isMobile ? 'Yes' : 'No'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Demo */}
              <div className={`rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-300 ${
                resolvedTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <h2 className="text-2xl font-semibold mb-6">Tabs System</h2>

                <TabsCompound
                  defaultTab="components"
                  tabs={[
                    {
                      id: 'components',
                      label: 'Components',
                      content: (
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-4">Component Library</h3>
                          <p className="text-sm mb-4">
                            This template includes a comprehensive component library with consistent styling,
                            TypeScript support, and accessibility features.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium mb-2">UI Components</h4>
                              <ul className="space-y-1 text-gray-600">
                                <li>• Button (multiple variants & sizes)</li>
                                <li>• Input (with validation)</li>
                                <li>• Modal (with Redux state)</li>
                                <li>• Tabs (context-based)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Advanced Features</h4>
                              <ul className="space-y-1 text-gray-600">
                                <li>• Toast Notifications</li>
                                <li>• Theme System</li>
                                <li>• Error Boundaries</li>
                                <li>• Redux State Management</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      id: 'hooks',
                      label: 'Hooks',
                      content: (
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-4">Custom Hooks</h3>
                          <p className="text-sm mb-4">
                            Centralized hooks for common functionality and state management.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">useModal:</span>
                              <span className="text-gray-600">Redux-powered modal management</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">useTheme:</span>
                              <span className="text-gray-600">Theme switching with persistence</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">useNotifications:</span>
                              <span className="text-gray-600">Toast notification system</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">useLocalStorage:</span>
                              <span className="text-gray-600">Type-safe localStorage management</span>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      id: 'state',
                      label: 'State Management',
                      content: (
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-4">Redux Toolkit Store</h3>
                          <p className="text-sm mb-4">
                            Centralized state management with Redux Toolkit for predictable state updates.
                          </p>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-2">UI Slice</h4>
                              <p className="text-xs text-gray-600">
                                Manages modals, sidebar, and loading states globally.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Theme Slice</h4>
                              <p className="text-xs text-gray-600">
                                Handles theme switching with system preference detection.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Notifications Slice</h4>
                              <p className="text-xs text-gray-600">
                                Manages toast notifications with auto-dismissal.
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>

              {/* Error Boundary Demo */}
              <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
                resolvedTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <h2 className="text-2xl font-semibold mb-6">Error Handling</h2>
                <ErrorDemo />
              </div>
            </div>
          </main>
        </div>

        {/* Modals */}
        <SimpleModal
          id="settings"
          title="Settings"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeSettings}>
                Cancel
              </Button>
              <Button onClick={closeSettings}>
                Save Changes
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <select
                    value={theme}
                    onChange={(e) => useTheme().setTheme(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Push notifications</span>
                </label>
              </div>
            </div>
          </div>
        </SimpleModal>

        <SimpleModal
          id="user-profile"
          title="User Profile"
          size="md"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-medium">John Doe</h3>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>

            <div className="space-y-4">
              <Input label="Full Name" defaultValue="John Doe" />
              <Input label="Email" type="email" defaultValue="john.doe@example.com" />
              <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </div>
        </SimpleModal>

        {/* Toast Container */}
        <ToastContainer position="top-right" />
      </div>
    </ErrorBoundaryWrapper>
  )
}

export default App
