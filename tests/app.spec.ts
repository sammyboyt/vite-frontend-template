import { test, expect } from '@playwright/test';

/**
 * APP SPECIFICATION - AI VECTORIZATION GUIDE
 *
 * This test file defines the expected behavior of a React application built with:
 * - React 18 + TypeScript + Tailwind CSS
 * - Redux Toolkit for state management
 * - Custom UI components (Button, Input, Modal, Tabs, Toast)
 * - Custom hooks (useModal, useTheme, useNotifications, etc.)
 * - Error boundaries and responsive design
 *
 * AI AGENTS: Read this file to understand what your application should implement.
 * Single comprehensive test validates all core features to minimize execution time.
 */

test.describe('React App Specification', () => {
  test.setTimeout(30000);

  // ============================================================================
  // COMPREHENSIVE APP VALIDATION - Single test covers all core requirements
  // ============================================================================

  test('✅ COMPLETE APP VALIDATION - All core features in one test', async ({ page }) => {
    // Navigate once per test instead of beforeEach (uses baseURL from config)
    await page.goto('/');

    // ============================================================================
    // BASIC APP STRUCTURE - Title, headings, navigation
    // ============================================================================
    await expect(page).toHaveTitle('Advanced Frontend Template');
    await expect(page.locator('h1').filter({ hasText: 'Advanced Frontend Template' })).toBeVisible();
    await expect(page.locator('text=Modern React + TypeScript')).toBeVisible();

    // Navigation elements - find specific buttons by position/context
    const sidebarButton = page.locator('button').filter({ hasText: /^$/ }).first();
    await expect(sidebarButton).toBeVisible();

    // ============================================================================
    // UI COMPONENTS - Button variants, Input fields, Tabs
    // ============================================================================
    // Button variants (Primary, Secondary, Outline)
    await expect(page.locator('button').filter({ hasText: 'Primary' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Secondary' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Outline' })).toBeVisible();

    // Button sizes (SM, LG, XL)
    await expect(page.locator('button').filter({ hasText: 'SM' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'LG' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'XL' })).toBeVisible();

    // Form inputs with labels
    await expect(page.locator('label').filter({ hasText: 'Email Address' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Full Name' })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Tabs component
    await expect(page.locator('button').filter({ hasText: 'Components' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Hooks' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'State Management' })).toBeVisible();

    // ============================================================================
    // ADVANCED FEATURES - Core functionality validation
    // ============================================================================
    // Modal system - check modal trigger buttons exist
    await expect(page.locator('button').filter({ hasText: 'Settings Modal' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'User Profile' })).toBeVisible();

    // Theme system - validate theme display exists
    await expect(page.locator('text=Current theme:')).toBeVisible();
    await expect(page.locator('text=Resolved theme:')).toBeVisible();

    // Sidebar navigation
    await expect(page.locator('text=Dashboard')).not.toBeVisible(); // Initially closed
    await sidebarButton.click();
    await expect(page.locator('text=Dashboard')).toBeVisible(); // Now open
    await sidebarButton.click();
    await expect(page.locator('text=Dashboard')).not.toBeVisible(); // Closed again

    // ============================================================================
    // ERROR HANDLING & RESPONSIVE DESIGN
    // ============================================================================
    // Error boundaries
    await expect(page.locator('h2').filter({ hasText: 'Error Handling' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Trigger Error' })).toBeVisible();

    // Responsive design (mobile detection)
    await expect(page.locator('text=Mobile:')).toBeVisible();

    // ============================================================================
    // FORM INTERACTIONS - User input validation
    // ============================================================================
    const emailInput = page.locator('input[type="email"]');
    const nameInput = page.locator('input[type="text"]').filter({ hasText: '' }).first();

    await emailInput.fill('test@example.com');
    await nameInput.fill('John Smith');

    await expect(emailInput).toHaveValue('test@example.com');
    await expect(nameInput).toHaveValue('John Smith');
  });

  // ============================================================================
  // AI VECTORIZATION REQUIREMENTS:
  //
  // When implementing this spec, your app MUST include:
  //
  // 1. CORE COMPONENTS (in src/components/ui/):
  //    - Button (variants: primary, secondary, outline, ghost, success, warning, danger)
  //    - Input (with labels, validation, help text, error states)
  //    - Modal/SimpleModal (with useModal hook integration)
  //    - Tabs/TabsList/TabsTrigger/TabsContent
  //    - Toast notifications (success, error, warning, info)
  //
  // 2. CUSTOM HOOKS (in src/hooks/):
  //    - useModal(modalId) - Redux modal state { isOpen, open, close, data }
  //    - useTheme() - Theme switching { theme, resolvedTheme, toggleTheme, setTheme }
  //    - useNotifications() - Toast system { success, error, warning, info }
  //    - useLocalStorage(key, defaultValue) - Type-safe localStorage
  //    - useDebounce(value, delay) - Debounced values
  //    - useIsMobile() - Responsive breakpoint detection
  //
  // 3. REDUX STATE (in src/store/slices/):
  //    - uiSlice - Modal/sidebar/loading state
  //    - themeSlice - Theme state management
  //    - notificationSlice - Toast notification queue
  //
  // 4. ERROR HANDLING:
  //    - ErrorBoundary component wrapping main app
  //    - Graceful error states in all components
  //
  // 5. STYLING & THEMING:
  //    - Tailwind CSS with custom design tokens
  //    - Dark/light/system theme support
  //    - Responsive design (mobile-first)
  //
  // 6. TESTING REQUIREMENTS:
  //    - Must pass yarn type-check (zero TypeScript errors)
  //    - Must build successfully with yarn build
  //    - Must pass this Playwright test specification
  //
  // ============================================================================
});