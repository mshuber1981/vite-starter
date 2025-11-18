# Vite Starter

A React + Vite template with Material-UI and a CLI for project configuration.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🎨 **Material-UI** - Complete design system with theming
- 🛠️ **Guided Configuration** - Interactive project setup
- 🧪 **Jest Testing** - Comprehensive testing suite
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Theme Toggle** - Light/dark mode switching
- 🚀 **React Router** - Client-side routing with 404 handling
- 🌐 **GitHub Pages Ready** - Pre-configured for easy deployment

## Quick Start

### Installation & Setup

```bash
npm install

# Configure your project (optional)
npm run config
```

### Development

```bash
npm run dev
```

### Deployment to GitHub Pages

```bash
npm run deploy
```

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Interactive Configuration

Run the configuration to set your primary theme color:

```bash
npm run config
```

Features include:

- 🎨 **Stable Arrow Key Navigation** - Smooth ↑↓ navigation with no screen flickering
- 🌈 **Numbered Color Menu** - Clean numbered list (1-10) with color previews and hex codes
- 🎯 **Dynamic Selection Indicator** - Real-time highlighting shows current selection
- 🎭 **Professional Interface** - ASCII banner with clean, organized layout
- ✨ **Current Color Markers** - Clearly shows active color with "● CURRENT"
- ✅ **Confirmation Prompts** - Safe selection process prevents accidental changes
- 🔧 **Cross-Platform** - Reliable interface works on all operating systems
- ⚡ **Instant Theme Integration** - Colors immediately available to React app

## Configuration Features

### 🎨 Guided Color Selection

Choose from 10 predefined Material Design colors for your primary theme:

- **Blue** (#1976d2) - Classic Material Design blue
- **Purple** (#9c27b0) - Rich purple accent
- **Teal** (#009688) - Modern teal green
- **Orange** (#ff9800) - Warm orange tone
- **Red** (#f44336) - Bold red accent
- **Green** (#4caf50) - Natural green
- **Indigo** (#3f51b5) - Deep indigo blue
- **Pink** (#e91e63) - Vibrant pink
- **Amber** (#ffc107) - Golden amber
- **Cyan** (#00bcd4) - Electric cyan

### ⚙️ Configuration Management

- Persistent project configuration
- Theme customization
- User preferences storage

## Testing

Comprehensive test suite with Jest for the scripts directory:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage reports
```

**Current Coverage:** 100% statements, 100% branches, 100% functions, 100% lines

### Test Structure

- **48 passing tests** across 3 test suites
- **Unit tests** - Individual function testing
- **Integration tests** - Real file operations and workflows
- **CLI structure tests** - Menu validation and error handling
- **Edge case coverage** - Invalid inputs, corrupted files, permission errors

## Project Structure

```
├── src/                       # React application
│   ├── components/            # Reusable UI components
│   │   ├── DynamicThemeProvider.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useThemeConfig.js
│   ├── assets/                # Static assets
│   └── main.jsx              # Application entry
├── scripts/                   # Configuration scripts
│   ├── __tests__/            # Comprehensive Jest tests
│   │   ├── configure-inquirer.test.js
│   │   ├── configure-utils.test.js
│   │   └── configure-utils.integration.test.js
│   ├── configure-inquirer.js  # Interactive CLI script
│   └── configure-utils.js     # Utility functions
├── public/                    # Static public assets
│   └── vite-starter.config.json  # Theme configuration
└── test/                      # Test setup and utilities
```
