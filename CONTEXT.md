# Project Context & Best Practices

## Configuration System

### Interactive Setup with npm run config

- **Purpose**: Guided project configuration with enhanced UX
- **Technology**: Inquirer.js for interactive prompts, Figlet for banner
- **Cross-Platform**: Works on Windows, Mac, Linux without permission issues
- **Architecture**: Modular design with separated utilities for testing

#### Key Features

- **Arrow Key Navigation** - Use ↑↓ arrows to select colors
- **Visual Banner** - Figlet ASCII art for professional look
- **Color Preview** - Shows current selection with visual indicators
- **Confirmation Prompts** - Prevents accidental changes
- **Error Recovery** - Graceful handling of file system errors
- **No Binaries** - Pure Node.js script, no chmod needed
- **100% Test Coverage** - Comprehensive testing suite

#### Implementation

```bash
npm run config        # Launch interactive configuration
npm test              # Run comprehensive test suite
npm test -- --coverage # View test coverage report
```

#### Dependencies for Enhanced UX

- `inquirer` - Interactive command line prompts
- `figlet` - ASCII art text for banners
- `chalk` - Terminal colors for enhanced feedback
- `jest` - Testing framework with ES modules support

#### Testing Architecture

- **Unit Tests** - Individual utility function validation
- **Integration Tests** - Real file system operations
- **CLI Structure Tests** - Menu and navigation validation
- **Error Handling Tests** - Edge cases and failure scenarios
- **Coverage Monitoring** - 100% coverage with quality thresholds

## MUI Layout Components

### Stack vs Box Usage Guidelines

#### Use Stack when:

- Arranging multiple items in a single direction (vertical or horizontal)
- You need consistent spacing between items with the `spacing` prop
- Simple linear layouts without complex positioning
- You want built-in responsive direction changes
- You need dividers between items

```jsx
// ✅ Good: Simple vertical layout with consistent spacing
<Stack spacing={2}>
  <Typography variant="h1">Title</Typography>
  <Button>Action</Button>
  <Typography>Description</Typography>
</Stack>

// ✅ Good: Horizontal layout with responsive direction
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
  <Button>Primary</Button>
  <Button>Secondary</Button>
</Stack>
```

#### Use Box when:

- Complex layouts requiring precise positioning or advanced flexbox/grid
- Single elements that need specific styling
- You need the `component` prop for semantic HTML elements
- Advanced responsive layouts with custom breakpoint behavior
- When you need more control over spacing than Stack provides

```jsx
// ✅ Good: Semantic HTML with styling
<Box component="nav" sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Box component="img" src={logo} alt="Logo" />
  <Box component="ul" sx={{ display: 'flex', gap: 2 }}>
    <li>Home</li>
    <li>About</li>
  </Box>
</Box>

// ✅ Good: Complex positioning
<Box sx={{
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 2
}}>
```

### Component Import Strategy

#### Prefer named imports for commonly used components:

```jsx
import { Stack, Box, Typography, Button } from "@mui/material";
```

#### Use specific imports for less common components:

```jsx
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
```

### Theme Integration

- Always use theme tokens when possible: `color: 'text.primary'` instead of hardcoded colors
- Leverage theme breakpoints: `sx={{ display: { xs: 'none', md: 'block' } }}`
- Use theme spacing: `spacing={2}` or `sx={{ p: 2 }}` instead of hardcoded pixels
- Access theme in sx prop: `sx={{ color: theme => theme.palette.mode === 'dark' ? '#888' : '#666' }}`

### CSS-in-JS Best Practices

- Use `sx` prop for component-specific styles
- Use theme `styleOverrides` for global component customization
- Prefer MUI components with `component` prop over regular HTML elements when styling is needed
- Use `CssBaseline` for consistent base styles across browsers

## Testing Best Practices

### Jest Configuration for ES Modules

- Uses `NODE_OPTIONS=--experimental-vm-modules` for ES module support
- `injectGlobals: true` enables describe, test, expect without imports
- Module mocking with `jest.unstable_mockModule()` for ES modules
- Coverage thresholds set to maintain quality standards

### Test Organization

```
scripts/__tests__/
├── configure-inquirer.test.js      # CLI structure validation
├── configure-utils.test.js         # Unit tests for utilities
└── configure-utils.integration.test.js  # Real file operations
```

### Testing Patterns

- **Unit Tests** - Test individual functions in isolation
- **Integration Tests** - Test complete workflows with real I/O
- **Mock Strategy** - Mock external dependencies, test real logic
- **Error Testing** - Cover edge cases and failure scenarios
- **File System Tests** - Use temporary directories for safe testing

### Coverage Standards

- 100% statement coverage required
- 100% branch coverage for critical paths
- Integration tests for user workflows
- Error resilience testing for production readiness

## React Router Setup

### Routing Architecture

This project uses React Router DOM v6 for client-side routing with a clean, declarative approach:

```jsx
// App.jsx - Main router configuration
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/example" element={<ExampleRoute />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Route Components

#### Home Route (`/`)

- **Location**: `src/components/Home.jsx`
- **Features**: Landing page with logos, counter, theme toggle
- **Navigation**: Button to navigate to example route
- **Error Boundary**: Counter triggers error at count 5 for testing

#### Example Route (`/example`)

- **Location**: `src/components/ExampleRoute.jsx`
- **Features**: Showcase page with feature cards and routing info
- **Navigation**: Back to home button, 404 test button
- **Content**: Educational content about React Router features

#### 404 Not Found (`*` - catch-all)

- **Location**: `src/components/NotFound.jsx`
- **Features**: User-friendly error page with helpful actions
- **Navigation**: Go home button, browser back button
- **Design**: Engaging 404 design with search icon and gradient text

### Navigation Patterns

#### Link Components

```jsx
import { Link } from "react-router-dom";

// MUI Button with routing
<Button component={Link} to="/example" variant="contained">
  Go to Example
</Button>

// Back navigation
<Button onClick={() => window.history.back()}>
  Go Back
</Button>
```

#### Programmatic Navigation

- Uses browser's `window.history.back()` for back navigation
- Link components for declarative navigation
- MUI Button integration with `component={Link}` prop

### Routing Best Practices

- **Declarative Routes**: All routes defined in single App.jsx file
- **Component Separation**: Each route is a separate component file
- **404 Handling**: Catch-all route (\*) for undefined paths
- **Navigation UX**: Clear back buttons and home links
- **MUI Integration**: Router links work seamlessly with MUI buttons

### GitHub Pages Deployment Support

This project is configured to work with GitHub Pages client-side routing:

#### Files Added for GitHub Pages:

- **`public/404.html`** - Redirects unknown routes to index.html
- **`index.html`** - Script to handle redirected URLs from 404.html
- **`vite.config.js`** - Base path configuration for production builds

#### How It Works:

1. User visits `/example` directly on GitHub Pages
2. GitHub Pages serves `404.html` (no `/example/index.html` exists)
3. `404.html` redirects to `/?/example` with encoded path
4. `index.html` script detects redirect and updates URL to `/example`
5. React Router takes over and renders the correct component

#### Deployment:

```bash
npm run deploy  # Builds and deploys to gh-pages branch
```

#### Configuration Notes:

- **Repository Name**: Update `base: '/your-repo-name/'` in `vite.config.js`
- **Production Only**: Base path only applies to production builds
- **Local Development**: Works normally with `/` base path

## Project Structure Notes

This project uses:

- **Vite** for build tooling and development server
- **React 19** with modern hooks and patterns
- **React Router DOM** for client-side routing and navigation
- **MUI Material** for component library and theming
- **Emotion** for CSS-in-JS styling
- **Error Boundaries** for graceful error handling
- **Theme switching** with system/light/dark mode support

## Development Workflow

- Use `npm run dev` for development server
- Hot module replacement (HMR) is configured for fast development
- Theme changes are applied instantly without page refresh
- Error boundary testing is built into the counter component (count >= 5)
- Navigation works seamlessly with browser back/forward buttons
