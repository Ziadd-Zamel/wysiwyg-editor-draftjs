# WYSIWYG Editor Documentation

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Components](#components)
5. [API Reference](#api-reference)
6. [Styling](#styling)
7. [Advanced Features](#advanced-features)
8. [Best Practices](#best-practices)

## Overview

The WYSIWYG Editor is a React-based rich text editor built with Draft.js. It provides a modern, intuitive interface for text editing with support for various formatting options.

## Installation

```bash
npm install wysiwyg-editor-draftjs
# or
yarn add wysiwyg-editor-draftjs
```

## Basic Usage

```tsx
import { WysiwygEditor } from "wysiwyg-editor-draftjs";
import { EditorState } from "draft-js";
import { useState } from "react";

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <WysiwygEditor
      value={editorState}
      onChange={setEditorState}
      placeholder="Start typing..."
    />
  );
}
```

## Components

### WysiwygEditor

The main editor component that provides the core editing functionality.

#### Props

| Prop          | Type                               | Required | Default           | Description                        |
| ------------- | ---------------------------------- | -------- | ----------------- | ---------------------------------- |
| value         | EditorState                        | No       | -                 | The current editor state           |
| onChange      | (state: EditorState) => void       | No       | -                 | Callback when editor state changes |
| className     | string                             | No       | ""                | Additional CSS classes             |
| placeholder   | string                             | No       | "Start typing..." | Placeholder text                   |
| renderToolbar | (props: ToolbarProps) => ReactNode | No       | -                 | Custom toolbar renderer            |
| readOnly      | boolean                            | No       | false             | Whether the editor is read-only    |

### Toolbar

The default toolbar component that provides formatting options.

#### Features

- Text formatting (Bold, Italic, Underline)
- Block formatting (Headers, Lists, Blockquotes)
- Keyboard shortcuts support

## API Reference

### Editor Methods

#### toggleInlineStyle

```typescript
toggleInlineStyle(inlineStyle: string): void
```

Toggles inline text styles (bold, italic, underline).

#### toggleBlockType

```typescript
toggleBlockType(blockType: string): void
```

Toggles block-level formatting (headers, lists, etc.).

### Keyboard Shortcuts

| Shortcut     | Action    |
| ------------ | --------- |
| Ctrl/Cmd + B | Bold      |
| Ctrl/Cmd + I | Italic    |
| Ctrl/Cmd + U | Underline |

## Styling

The editor uses Tailwind CSS for styling. You can customize the appearance using:

1. Custom CSS classes via the `className` prop
2. Tailwind CSS configuration
3. Custom toolbar rendering

Example custom styling:

```tsx
<WysiwygEditor
  className="my-custom-editor"
  // ... other props
/>
```

## Advanced Features

### Custom Toolbar

You can create a custom toolbar by using the `renderToolbar` prop:

```tsx
<WysiwygEditor
  renderToolbar={(props) => (
    <CustomToolbar
      editorState={props.editorState}
      onToggleInlineStyle={props.onToggleInlineStyle}
      onToggleBlockType={props.onToggleBlockType}
    />
  )}
/>
```

### Controlled vs Uncontrolled

The editor can be used in both controlled and uncontrolled modes:

```tsx
// Controlled
const [editorState, setEditorState] = useState(EditorState.createEmpty());
<WysiwygEditor value={editorState} onChange={setEditorState} />

// Uncontrolled
<WysiwygEditor />
```

## Best Practices

1. **State Management**

   - Use controlled mode when you need to sync with external state
   - Use uncontrolled mode for simple use cases

2. **Performance**

   - Memoize callbacks using `useCallback`
   - Use `useMemo` for complex computations
   - Avoid unnecessary re-renders

3. **Accessibility**

   - Always provide meaningful placeholder text
   - Use appropriate ARIA labels
   - Ensure keyboard navigation works

4. **Error Handling**
   - Implement proper error boundaries
   - Handle edge cases in state updates
   - Validate input when necessary

## Examples

### Basic Editor

```tsx
import { WysiwygEditor } from "wysiwyg-editor-draftjs";

function BasicEditor() {
  return <WysiwygEditor />;
}
```

### Editor with Custom Styling

```tsx
import { WysiwygEditor } from "wysiwyg-editor-draftjs";

function StyledEditor() {
  return (
    <WysiwygEditor
      className="border-2 border-blue-500 rounded-lg"
      placeholder="Write your content here..."
    />
  );
}
```

### Controlled Editor with Custom Toolbar

```tsx
import { WysiwygEditor } from "wysiwyg-editor-draftjs";
import { EditorState } from "draft-js";
import { useState } from "react";

function CustomEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <WysiwygEditor
      value={editorState}
      onChange={setEditorState}
      renderToolbar={(props) => <MyCustomToolbar {...props} />}
    />
  );
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
