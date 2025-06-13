import React, { useState, useCallback, useMemo } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { Toolbar } from "./Toolbar";

// The main WYSIWYG editor component
const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "Start typing...",
  renderToolbar,
  readOnly = false,
}) => {
  // Internal state used when the component is uncontrolled (no `value` or `onChange` passed)
  const [internalEditorState, setInternalEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Determines if the component is controlled or uncontrolled
  const isControlled = value !== undefined && onChange !== undefined;

  // Chooses the correct editor state to use (controlled vs uncontrolled)
  const editorState = isControlled ? value : internalEditorState;

  // Handles editor state changes and calls either internal setter or external onChange
  const handleEditorChange = useCallback(
    (newEditorState: EditorState) => {
      if (isControlled) {
        onChange!(newEditorState); // Use external handler if controlled
      } else {
        setInternalEditorState(newEditorState); // Update local state if uncontrolled
      }
    },
    [isControlled, onChange]
  );

  // Handles built-in commands like bold (ctrl+b), italic (ctrl+i), etc.
  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        handleEditorChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [handleEditorChange]
  );

  // Toggles inline styles like bold, italic, underline
  const toggleInlineStyle = useCallback(
    (inlineStyle: string) => {
      handleEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState, handleEditorChange]
  );

  // Toggles block styles like header, list, blockquote
  const toggleBlockType = useCallback(
    (blockType: string) => {
      handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, handleEditorChange]
  );

  // Memoize toolbar props to prevent unnecessary re-renders
  const toolbarProps: ToolbarProps = useMemo(
    () => ({
      editorState,
      onToggleInlineStyle: toggleInlineStyle,
      onToggleBlockType: toggleBlockType,
    }),
    [editorState, toggleInlineStyle, toggleBlockType]
  );

  // Fallback toolbar if no custom one is passed
  const defaultToolbar = (
    <Toolbar
      editorState={editorState}
      onToggleInlineStyle={toggleInlineStyle}
      onToggleBlockType={toggleBlockType}
    />
  );

  return (
    <div
      className={`wysiwyg-editor border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {/* Show toolbar only if not in read-only mode */}
      {!readOnly &&
        (renderToolbar ? renderToolbar(toolbarProps) : defaultToolbar)}

      {/* Editor container with styling and focus ring */}
      <div className="editor-content p-4 min-h-[200px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
