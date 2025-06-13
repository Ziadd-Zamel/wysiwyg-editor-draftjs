declare type ToolbarProps = {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  onToggleBlockType: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  className?: string;
};

declare type WysiwygEditorProps = {
  // Controlled mode props
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;

  // Uncontrolled mode props
  defaultValue?: EditorState;

  // Styling props
  className?: string;

  // Customization props
  renderToolbar?: (props: ToolbarProps) => ReactNode;

  // Other props
  placeholder?: string;
  readOnly?: boolean;
  ariaLabel?: string;
  id?: string;
};
