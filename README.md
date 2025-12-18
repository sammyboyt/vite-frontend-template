# 🚀 Advanced React Frontend Template

> **Enterprise-Ready React Application Template** - A comprehensive, production-ready React + TypeScript + Redux + Tailwind CSS starter template with advanced state management, component systems, and developer experience best practices.

---

## 📋 **AI Agent Setup Checklist**

### **Phase 1: Environment Setup**

- [ ] **Clone Repository**: `git clone <repository-url>`
- [ ] **Install Dependencies**: `yarn install` (preferred) or `npm install`
- [ ] **Verify Node Version**: Node.js 18+ required
- [ ] **Verify Yarn Version**: Yarn 1.x preferred
- [ ] **Type Check**: `yarn type-check` - should pass with no errors
- [ ] **Build Verification**: `yarn build` - should complete successfully
- [ ] **Local Development**: `yarn dev` - should start on http://localhost:3000

### **Phase 2: Architecture Understanding**

- [ ] **Review Core Architecture**: Understand Redux store, slices, and state flow
- [ ] **Component Library**: Explore UI components in `src/components/ui/`
- [ ] **Custom Hooks**: Review hooks in `src/hooks/` for reusable logic
- [ ] **Styling System**: Understand Tailwind config and CSS variables
- [ ] **Build Configuration**: Review Vite config and optimization settings

### **Phase 3: Development Workflow**

- [ ] **Code Standards**: Review ESLint and Prettier configuration
- [ ] **Git Workflow**: Understand branching strategy and commit conventions
- [ ] **Testing Setup**: Review testing utilities and patterns
- [ ] **Deployment**: Understand build and S3 deployment process

---

## 🏗️ **Architecture Overview**

### **Core Technologies**

- **React 18** - Modern React with concurrent features
- **TypeScript** - Strict type checking with no `any` types
- **Redux Toolkit** - Centralized state management with RTK Query ready
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast build tool with HMR and optimized production builds

### **Advanced Features**

- **Modal System**: Redux-powered modal management with accessibility
- **Tabs System**: Flexible tabbed interfaces with context management
- **Toast Notifications**: Elegant notification system with auto-dismissal
- **Theme System**: Dark/light mode with system preference detection
- **Error Boundaries**: Graceful error handling with fallback UI

### **Developer Experience**

- **Custom Hooks Library**: Reusable business logic hooks
- **Component Variants**: Consistent component APIs with class-variance-authority
- **Type Safety**: Full TypeScript coverage with strict settings
- **Performance**: Code splitting, lazy loading, and optimization
- **Testing Ready**: Jest and React Testing Library setup

---

## 🎯 **Getting Started (For AI Agents)**

### **1. Repository Setup**

```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Install dependencies (Yarn preferred)
yarn install

# Verify setup
yarn type-check
yarn build
```

### **2. Development Server**

```bash
# Start development server
yarn dev

# Server will be available at:
# http://localhost:3000
```

### **3. Build for Production**

```bash
# Build optimized production bundle
yarn build

# Preview production build locally
yarn preview

# Build specifically for S3 deployment
yarn build:s3
```

---

## 📁 **Project Structure (AI Agent Reference)**

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Core UI components (Button, Input, Modal, etc.)
│   └── error-boundary/  # Error handling components
├── hooks/               # Custom React hooks
│   ├── useModal.ts      # Modal state management
│   ├── useTheme.ts      # Theme management
│   ├── useNotifications.ts # Toast notifications
│   ├── useLocalStorage.ts # Type-safe localStorage
│   ├── useDebounce.ts   # Debouncing utilities
│   └── useIsMobile.ts   # Responsive breakpoints
├── store/               # Redux state management
│   ├── index.ts         # Store configuration
│   └── slices/          # Feature-specific state slices
│       ├── uiSlice.ts   # UI state (modals, sidebar)
│       ├── themeSlice.ts # Theme state
│       └── notificationSlice.ts # Toast notifications
├── styles/              # Styling and design system
│   ├── index.css        # Global styles import
│   └── tailwind.css     # CSS variables and utilities
├── utils/               # Utility functions
│   ├── cn.ts           # Class name merging utility
│   └── index.ts        # Utility exports
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type definitions

public/                 # Static assets (favicons, images)
dist/                   # Production build output (after build)
```

---

## 🛠️ **Development Best Practices (AI Agent Guidelines)**

### **1. Component Development**

```typescript
// ✅ DO: Use proper TypeScript interfaces
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

// ✅ DO: Use the cn utility for class merging
const buttonClasses = cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  size === "lg" && "large-classes",
  className
);

// ❌ DON'T: Use any types
// ❌ DON'T: Inline large className strings
```

### **2. State Management**

```typescript
// ✅ DO: Use Redux Toolkit for global state
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

// ✅ DO: Use custom hooks for state logic
export function useModal(modalId: string) {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.ui.modals[modalId]);

  return {
    isOpen: modal?.isOpen ?? false,
    open: () => dispatch(openModal({ modalId })),
    close: () => dispatch(closeModal(modalId)),
  };
}
```

### **3. Hook Usage Patterns**

```typescript
// ✅ DO: Create custom hooks for reusable logic
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Implementation with proper error handling
  });

  // Return typed interface
  return [storedValue, setValue, removeValue] as const;
}

// ✅ DO: Use existing hooks from the library
import { useModal, useTheme, useNotifications } from "../hooks";

function MyComponent() {
  const { open, close, isOpen } = useModal("my-modal");
  const { theme, toggleTheme } = useTheme();
  const { success, error } = useNotifications();
}
```

### **4. Styling Guidelines**

```typescript
// ✅ DO: Use Tailwind utilities with design tokens
<div className="bg-background-primary text-text-primary p-spacing-md rounded-radius-md">

// ✅ DO: Leverage CSS custom properties
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  padding: var(--spacing-md);
}

// ✅ DO: Use the cn utility for conditional classes
const classes = cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)
```

### **5. Error Handling**

```typescript
// ✅ DO: Use Error Boundaries for component-level errors
<ErrorBoundaryWrapper onError={(error) => {
  console.error('Component error:', error)
  // Report to error tracking service
}}>
  <MyComponent />
</ErrorBoundaryWrapper>

// ✅ DO: Handle async operations properly
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

### **6. TypeScript Best Practices**

```typescript
// ✅ DO: Use strict TypeScript settings
// ✅ DO: Define proper interfaces for props
// ✅ DO: Use union types for variant props
// ✅ DO: Leverage utility types (Omit, Pick, Partial)
// ✅ DO: Use const assertions for literal types
// ✅ DO: Prefer type over interface for unions

// ❌ DON'T: Use any types
// ❌ DON'T: Disable TypeScript checks
// ❌ DON'T: Use type assertions unnecessarily
```

---

## 🚀 **Building Web Applications (AI Agent Workflow)**

### **Phase 1: Planning & Setup**

1. **Define Application Requirements**
   - Identify core features and user flows
   - Plan component hierarchy and state structure
   - Design API integration points

2. **Setup New Features**

   ```bash
   # Create feature directory structure
   mkdir src/features/my-feature
   mkdir src/features/my-feature/components
   mkdir src/features/my-feature/hooks
   mkdir src/features/my-feature/types
   ```

3. **Add Redux State (if needed)**
   ```typescript
   // src/store/slices/myFeatureSlice.ts
   const myFeatureSlice = createSlice({
     name: "myFeature",
     initialState,
     reducers: {
       // Define reducers
     },
   });
   ```

### **Phase 2: Component Development**

1. **Create UI Components**

   ```typescript
   // src/components/ui/MyComponent.tsx
   interface MyComponentProps {
     variant?: "primary" | "secondary";
     onAction?: () => void;
   }

   export const MyComponent: React.FC<MyComponentProps> = ({
     variant = "primary",
     onAction,
   }) => {
     // Implementation using existing patterns
   };
   ```

2. **Add to Component Exports**

   ```typescript
   // src/components/ui/index.ts
   export { MyComponent } from "./MyComponent";
   ```

3. **Create Custom Hooks**
   ```typescript
   // src/hooks/useMyFeature.ts
   export function useMyFeature() {
     // Custom hook logic
     return {
       // Return typed interface
     };
   }
   ```

### **Phase 3: Integration & Testing**

1. **Integrate with Existing App**
   - Add routes if using routing
   - Connect to Redux store
   - Add to main App component

2. **Add Error Boundaries**

   ```typescript
   <ErrorBoundaryWrapper>
     <MyNewFeature />
   </ErrorBoundaryWrapper>
   ```

3. **Test Integration**
   ```bash
   yarn type-check  # Ensure no TypeScript errors
   yarn build      # Ensure build succeeds
   yarn preview    # Test production build
   ```

### **Phase 4: Deployment**

1. **Build for Production**

   ```bash
   yarn build:s3
   ```

2. **Deploy to S3/Static Hosting**
   - Upload `dist/` folder contents
   - Configure CDN (CloudFront recommended)
   - Set up proper cache headers

---

## 📋 **Code Quality Standards**

### **File Naming Conventions**

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `camelCase.ts` (e.g., `useUserProfile.ts`)
- Utils: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `PascalCase.ts` (e.g., `UserTypes.ts`)
- Redux slices: `camelCaseSlice.ts`

### **Import Order**

```typescript
// 1. React imports
import React, { useState } from "react";

// 2. Third-party libraries
import { useDispatch } from "react-redux";
import { Button } from "lucide-react";

// 3. Local imports (relative)
import { useCustomHook } from "../hooks";
import { MyComponent } from "./MyComponent";
import { cn } from "../../utils";

// 4. Type imports
import type { User } from "../../types";
```

### **Component Structure**

```typescript
interface ComponentProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentProps> = ({
  // Destructured props
}) => {
  // Custom hooks at top
  const dispatch = useDispatch()
  const { data, loading } = useCustomHook()

  // Local state
  const [state, setState] = useState()

  // Effects
  useEffect(() => {
    // Side effects
  }, [])

  // Event handlers
  const handleClick = () => {
    // Handler logic
  }

  // Early returns for loading/error states
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // Main render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

ComponentName.displayName = 'ComponentName'
```

---

## 🔧 **Available Scripts**

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `yarn dev`        | Start development server                 |
| `yarn build`      | Build for production                     |
| `yarn preview`    | Preview production build locally         |
| `yarn serve`      | Serve production build with host binding |
| `yarn build:s3`   | Build optimized for S3 deployment        |
| `yarn type-check` | Run TypeScript type checking             |
| `yarn lint`       | Run ESLint code quality checks           |
| `yarn format`     | Format code with Prettier                |

---

## 🚀 **Deployment to S3**

```bash
# Build optimized bundle
yarn build:s3

# Upload dist/ folder to S3 bucket
# Configure static website hosting
# Set index.html as index document
```

**S3 Build Structure:**

```
dist/
├── index.html              # Main HTML file
└── assets/
    ├── vendor-*.js         # React/ReactDOM bundle
    ├── index-*.js          # Main application bundle
    ├── state-*.js          # Redux state bundle
    ├── ui-*.js             # UI libraries bundle
    └── index-*.css         # Compiled styles
```

---

## 🧪 **Testing Guidelines**

### **Component Testing**

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    render(<MyComponent />)
    fireEvent.click(screen.getByRole('button'))
    // Assert expected behavior
  })
})
```

### **Hook Testing**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCustomHook } from "./useCustomHook";

describe("useCustomHook", () => {
  it("returns expected values", () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current).toEqual({
      // Expected return values
    });
  });
});
```

---

## 🎯 **AI Agent Success Criteria**

- [ ] **Zero TypeScript Errors**: `yarn type-check` passes
- [ ] **Successful Build**: `yarn build` completes without errors
- [ ] **No ESLint Violations**: `yarn lint` passes
- [ ] **Optimized Bundle**: Build size under 300KB total
- [ ] **Accessible Components**: Proper ARIA labels and keyboard navigation
- [ ] **Responsive Design**: Works on mobile and desktop
- [ ] **Performance**: Lazy loading and code splitting implemented
- [ ] **Error Handling**: Error boundaries for all user-facing components
- [ ] **SEO Ready**: Proper meta tags and semantic HTML
- [ ] **Production Ready**: Optimized for static hosting deployment

---

## 📞 **Support & Resources**

- **Redux Documentation**: https://redux-toolkit.js.org/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Best Practices**: https://react.dev/learn
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Vite Guide**: https://vitejs.dev/guide/

---

**🎉 Ready to build amazing web applications!** This template provides everything you need for enterprise-grade React development with modern best practices and excellent developer experience.

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts
│   ├── error-boundary/
│   │   ├── ErrorBoundary.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useIsMobile.ts
│   ├── useModal.ts
│   ├── useTheme.ts
│   ├── useNotifications.ts
│   └── index.ts
├── store/
│   ├── index.ts
│   └── slices/
│       ├── uiSlice.ts
│       ├── themeSlice.ts
│       └── notificationSlice.ts
├── styles/
│   ├── index.css
│   └── tailwind.css
├── utils/
│   ├── cn.ts
│   └── index.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start development server:**

   ```bash
   yarn dev
   ```

3. **Build for production:**

   ```bash
   yarn build
   ```

4. **Preview production build locally:**

   ```bash
   yarn preview
   ```

5. **Type checking:**
   ```bash
   yarn type-check
   ```

## 🚀 Deployment to S3

The app is optimized for static hosting on AWS S3:

### Build for S3 Deployment

```bash
# Build and prepare for S3 deployment
yarn build:s3
```

This creates optimized static files in the `dist/` folder with:

- ✅ Chunked JavaScript bundles for better caching
- ✅ Optimized CSS with Tailwind utilities
- ✅ Proper asset paths for S3 hosting
- ✅ SEO-friendly HTML structure

### S3 Deployment Steps

1. **Create an S3 bucket** (or use existing one)
2. **Enable static website hosting** in bucket properties
3. **Upload the entire `dist/` folder** to your S3 bucket
4. **Set bucket policy** for public read access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```
5. **Configure index document** as `index.html`

### S3 Build Structure

```
dist/
├── index.html              # Main HTML file
└── assets/
    ├── vendor-*.js         # React/ReactDOM (141KB)
    ├── index-*.js          # Main app bundle (56KB)
    ├── state-*.js          # Redux bundle (25KB)
    ├── ui-*.js             # UI libraries (11KB)
    └── index-*.css         # Styles (35KB)
```

### Testing S3 Deployment Locally

```bash
# Serve the dist folder locally to test
yarn serve
```

Then visit `http://localhost:4173` to test your production build.

## Component Usage

### Button Component

```tsx
import { Button } from './components'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With loading state
<Button loading>Submitting...</Button>
```

### Input Component

```tsx
import { Input } from './components'

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helpText="We'll never share your email."
/>

<Input
  label="Full Name"
  type="text"
  required
  error="This field is required"
/>
```

### Modal Component

```tsx
import { Modal, SimpleModal, useModal } from "./components";

function MyComponent() {
  const { open, close, isOpen } = useModal("my-modal");

  return (
    <>
      <button onClick={() => open()}>Open Modal</button>

      <SimpleModal
        id="my-modal"
        title="My Modal"
        footer={<button onClick={() => close()}>Close</button>}
      >
        <p>Modal content here...</p>
      </SimpleModal>
    </>
  );
}
```

### Tabs Component

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsCompound } from './components'

// Basic usage
<Tabs defaultTab="tab1">
  <TabsList>
    <TabsTrigger tabId="tab1">Tab 1</TabsTrigger>
    <TabsTrigger tabId="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent tabId="tab1">Content 1</TabsContent>
  <TabsContent tabId="tab2">Content 2</TabsContent>
</Tabs>

// Compound component
<TabsCompound
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
/>
```

### Toast Notifications

```tsx
import { useNotifications } from "./hooks";

function MyComponent() {
  const { success, error, warning, info } = useNotifications();

  return (
    <div>
      <button onClick={() => success("Success!", "Operation completed")}>
        Show Success
      </button>
      <button onClick={() => error("Error!", "Something went wrong")}>
        Show Error
      </button>
    </div>
  );
}
```

### Theme Management

```tsx
import { useTheme } from "./hooks";

function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  return <button onClick={toggleTheme}>Current theme: {resolvedTheme}</button>;
}
```

### Custom Hooks

```tsx
import { useLocalStorage, useDebounce, useIsMobile } from "./hooks";

// Type-safe localStorage
const [value, setValue] = useLocalStorage("key", "default");

// Debounced search
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 300);

// Mobile detection
const isMobile = useIsMobile();
```

## Design System

The template includes a comprehensive design system with:

- **CSS Variables**: All design tokens are defined as CSS custom properties
- **Color Palette**: Primary, secondary, success, warning, error, and surface colors
- **Typography**: Consistent font sizes, weights, and line heights
- **Spacing**: Standardized spacing scale
- **Shadows**: Multiple shadow levels for depth
- **Animations**: Subtle animations for interactions

## Customization

### Adding New Components

1. Create component in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Re-export from `src/components/index.ts`

### Modifying Styles

- Edit `src/styles/tailwind.css` for global styles and CSS variables
- Modify `tailwind.config.js` for Tailwind configuration
- Use the `cn()` utility for conditional classes

### TypeScript Configuration

- Strict TypeScript settings in `tsconfig.json`
- Path aliases configured for clean imports
- No `any` types used throughout the codebase

## Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn type-check` - Run TypeScript type checking
- `yarn format` - Format code with Prettier

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design with mobile-first approach

## Advanced Usage

### Adding New Redux Slices

```typescript
// src/store/slices/newSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewState {
  data: string[];
}

const initialState: NewState = {
  data: [],
};

const newSlice = createSlice({
  name: "new",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = newSlice.actions;
export default newSlice.reducer;
```

### Custom Hooks Pattern

```typescript
// src/hooks/useCustomFeature.ts
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export function useCustomFeature() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.custom.data);

  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load data logic
      dispatch(loadDataSuccess(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, refetch: loadData };
}
```

## Contributing

This advanced template provides a solid foundation for enterprise-level React applications. Key areas for extension:

- **State Management**: Add new Redux slices for domain-specific state
- **Component Library**: Extend UI components with new variants and features
- **Custom Hooks**: Create domain-specific hooks for business logic
- **Theme System**: Add more theme variants or custom design tokens
- **Testing**: Add Jest + React Testing Library setup
- **API Integration**: Add GraphQL/REST client configuration
- **Routing**: Implement React Router with protected routes
- **Internationalization**: Add i18n support with react-i18next

## License

This template is provided as-is for building frontend applications.
