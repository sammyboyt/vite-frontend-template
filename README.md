# 🚀 Vite Frontend Template - MCP Plugin

**Production-ready React + TypeScript + Tailwind CSS foundation.**

**For AI Agents**: This is a complete "vertical" template. AI guidance is embedded directly in the source code. Read the actual implementation files to understand patterns and requirements.

---

## 🎯 QUICK START (For AI Agents)

```bash
# When you need to build a React application:
1. Read the source files in src/ - they contain embedded AI guidance
2. Follow the established patterns and component implementations
3. Run: yarn type-check && yarn build && yarn test to verify
```

---

## 📁 WHAT'S INCLUDED

| Feature              | Description                                   |
| -------------------- | --------------------------------------------- |
| **React 18**         | Modern React with hooks & concurrent features |
| **TypeScript**       | Strict typing, no `any` types                 |
| **Redux Toolkit**    | Centralized state management                  |
| **Tailwind CSS**     | Utility-first styling with design system      |
| **UI Components**    | Button, Input, Modal, Tabs, Toast             |
| **Custom Hooks**     | Reusable logic patterns                       |
| **Playwright Tests** | E2E testing with working examples             |
| **Error Boundaries** | Graceful error handling                       |
| **Theme System**     | Dark/light mode support                       |

---

## 🛠️ DEVELOPMENT COMMANDS

```bash
yarn dev              # Start development server (port 5174)
yarn dev:port         # Start with custom port: PORT=3000 yarn dev:port
yarn build           # Production build
yarn type-check      # TypeScript validation
yarn test           # Run Playwright tests
yarn test:dev        # Run tests against dev server
yarn build:s3       # S3-optimized build
```

## 🔌 PORT CONFIGURATION

**Environment Variables:**

- `VITE_PORT` - Development server port (default: 5174)
- `BASE_URL` - Base URL for Playwright tests (default: http://localhost:5174)

**Automatic Port Handling:**

- Vite automatically finds available ports if the default is in use!

**Examples:**

```bash
# Use default port 5174
yarn dev

# Use custom port
VITE_PORT=3000 yarn dev

# Run tests on different port
BASE_URL=http://localhost:3000 yarn test
```

---

## 📖 AI GUIDANCE

**AI guidance is embedded directly in the source code.** Read these key files:

- `src/App.tsx` - Main application structure and patterns
- `src/components/ui/` - Component implementations and usage
- `src/hooks/` - Custom hook patterns
- `src/store/` - Redux state management
- `tests/app.spec.ts` - Test specifications and requirements

**Each file contains 🤖 AI AGENT GUIDANCE comments explaining implementation requirements.**
