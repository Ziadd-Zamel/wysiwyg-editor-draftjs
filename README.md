# WYSIWYG Editor Component

A flexible and reusable WYSIWYG (What You See Is What You Get) editor component built with React, TypeScript, and Draft.js. This component supports both controlled and uncontrolled modes, customizable toolbars, and includes comprehensive testing.

## Features

- ✅ **Controlled and Uncontrolled Modes**: Works with external state management or manages its own internal state
- ✅ **Rich Text Formatting**: Bold, italic, and underline formatting with toolbar buttons
- ✅ **Keyboard Shortcuts**: Standard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U) for formatting
- ✅ **Customizable Toolbar**: Replace the default toolbar with your own using the `renderToolbar` prop
- ✅ **Read-only Mode**: Display content without editing capabilities
- ✅ **TypeScript Support**: Full type safety with comprehensive TypeScript definitions
- ✅ **Comprehensive Testing**: Unit tests for all functionality using Vitest and React Testing Library
- ✅ **Async Content**: Fake API integration for loading and saving content
- ✅ **Utility Functions**: Helper functions for serialization, deserialization, and text extraction

## Installation

This project uses Draft.js as the only third-party library for editor functionality:

```bash
npm install draft-js @types/draft-js
```

## Quick Start

### Basic Usage (Uncontrolled)

```tsx
import WysiwygEditor from './components/WysiwygEditor';

function App() {
  return (
    <WysiwygEditor 
      placeholder="Start typing..." 
    />
  );
}
```

### Controlled Mode

```tsx
import { useState } from 'react';
import { EditorState } from 'draft-js';
import WysiwygEditor from './components/WysiwygEditor';

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <WysiwygEditor 
      value={editorState}
      onChange={setEditorState}
      placeholder="Controlled editor..."
    />
  );
}
```

### Custom Toolbar

```tsx
import WysiwygEditor, { ToolbarProps } from './components/WysiwygEditor';

const customToolbar = ({ editorState, onToggleInlineStyle }: ToolbarProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  
  return (
    <div className="custom-toolbar">
      <button
        onClick={() => onToggleInlineStyle('BOLD')}
        className={currentStyle.has('BOLD') ? 'active' : ''}
      >
        Bold
      </button>
      {/* Add more custom buttons */}
    </div>
  );
};

function App() {
  return (
    <WysiwygEditor 
      renderToolbar={customToolbar}
      placeholder="Custom toolbar editor..."
    />
  );
}
```

## API Reference

### WysiwygEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `EditorState` | `undefined` | Editor state for controlled mode |
| `onChange` | `(state: EditorState) => void` | `undefined` | Callback for state changes in controlled mode |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `renderToolbar` | `(props: ToolbarProps) => ReactNode` | `undefined` | Custom toolbar renderer |
| `readOnly` | `boolean` | `false` | Read-only mode |

### ToolbarProps

| Prop | Type | Description |
|------|------|-------------|
| `editorState` | `EditorState` | Current editor state |
| `onToggleInlineStyle` | `(style: string) => void` | Toggle inline formatting |
| `onToggleBlockType` | `(blockType: string) => void` | Toggle block formatting |

### Utility Functions

```tsx
import { 
  serializeEditorState,
  deserializeEditorState,
  getPlainText,
  createEditorStateFromText
} from './components/WysiwygEditor';

// Serialize editor state to JSON string
const serialized = serializeEditorState(editorState);

// Deserialize JSON string to editor state
const deserialized = deserializeEditorState(serialized);

// Extract plain text from editor state
const plainText = getPlainText(editorState);

// Create editor state from plain text
const newState = createEditorStateFromText('Hello World');
```

## Running the Project

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── WysiwygEditor.tsx          # Main editor component
│   ├── DemoPage.tsx               # Demo page showcasing all features
│   └── __tests__/
│       └── WysiwygEditor.test.tsx # Comprehensive test suite
├── hooks/
│   └── useAsyncContent.ts         # Hook for async content management
├── services/
│   └── api.ts                     # Fake API for async demo
└── test/
    └── setup.ts                   # Test configuration
```

## Features Demonstrated

### 1. Controlled vs Uncontrolled Modes
- **Controlled**: Parent component manages editor state
- **Uncontrolled**: Editor manages its own internal state

### 2. Formatting Options
- **Bold** (Ctrl+B): Toggle bold formatting
- **Italic** (Ctrl+I): Toggle italic formatting  
- **Underline** (Ctrl+U): Toggle underline formatting

### 3. Customizable Toolbar
- Replace default toolbar with custom implementation
- Access to editor state and formatting functions
- Complete control over toolbar appearance and behavior

### 4. Read-only Mode
- Display content without editing capabilities
- Toolbar is automatically hidden
- Useful for content preview scenarios

### 5. Async Content Management
- Load content from fake API with loading states
- Save content with error handling
- Demonstrates real-world usage patterns

## Testing

The component includes comprehensive unit tests covering:

- ✅ Controlled and uncontrolled mode behavior
- ✅ Toolbar functionality (bold, italic, underline)
- ✅ Custom toolbar rendering
- ✅ Read-only mode
- ✅ Keyboard shortcuts
- ✅ Utility functions
- ✅ Error handling
- ✅ Accessibility features

Run tests with:
```bash
npm test
```

## Browser Compatibility

This component works in all modern browsers that support:
- ES2020+ features
- Draft.js requirements
- React 18+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built with [Draft.js](https://draftjs.org/) for rich text editing
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Testing with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/)