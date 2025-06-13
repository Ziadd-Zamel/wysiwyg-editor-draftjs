import { Bold, Italic, Underline } from "lucide-react";

export const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  const formatButtons = [
    {
      style: "BOLD",
      icon: Bold,
      label: "Bold",
      isActive: currentStyle.has("BOLD"),
    },
    {
      style: "ITALIC",
      icon: Italic,
      label: "Italic",
      isActive: currentStyle.has("ITALIC"),
    },
    {
      style: "UNDERLINE",
      icon: Underline,
      label: "Underline",
      isActive: currentStyle.has("UNDERLINE"),
    },
  ];

  return (
    <div className="toolbar flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
      {formatButtons.map(({ style, icon: Icon, label, isActive }) => (
        <button
          key={style}
          type="button"
          onClick={() => onToggleInlineStyle(style)}
          className={`toolbar-button p-2 rounded hover:bg-gray-200 transition-colors ${
            isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
          }`}
          title={label}
          aria-label={label}
          aria-pressed={isActive}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};
