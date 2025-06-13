declare type ToolbarProps = {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  onToggleBlockType: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  className?: string;
};

declare type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

declare type ContentData = {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
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
