import { Bold, Italic, Underline } from "lucide-react";
import { EditorState, RichUtils } from "draft-js";

type ToolbarProps = {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  onToggleBlockType: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  className?: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
  onChange,
  className = "",
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  const formatButtons = [
    {
      style: "BOLD",
      icon: Bold,
      label: "Bold",
      isActive: currentStyle.has("BOLD"),
      testId: "bold-button",
    },
    {
      style: "ITALIC",
      icon: Italic,
      label: "Italic",
      isActive: currentStyle.has("ITALIC"),
      testId: "italic-button",
    },
    {
      style: "UNDERLINE",
      icon: Underline,
      label: "Underline",
      isActive: currentStyle.has("UNDERLINE"),
      testId: "underline-button",
    },
  ];

  const handleStyleToggle = (style: string) => {
    // Call the onToggleInlineStyle prop
    onToggleInlineStyle(style);

    // If onChange is provided, also call it with the new editor state
    if (onChange) {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
      onChange(newEditorState);
    }
  };

  return (
    <div
      className={`toolbar flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-300 ${className}`}
      role="toolbar"
      aria-label="Text formatting toolbar"
    >
      {formatButtons.map(({ style, icon: Icon, label, isActive, testId }) => (
        <button
          key={style}
          type="button"
          onClick={() => handleStyleToggle(style)}
          className={`toolbar-button p-2 rounded hover:bg-gray-200 transition-colors ${
            isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
          }`}
          title={label}
          aria-label={label}
          aria-pressed={isActive}
          data-testid={testId}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};
