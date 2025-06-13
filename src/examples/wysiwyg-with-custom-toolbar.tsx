import { Bold, Italic, Underline } from "lucide-react";
import WysiwygEditor from "../components/wysiwyg-editor";

const CustomToolbarExample = ({
  editorState,
  onToggleInlineStyle,
}: ToolbarProps) => {
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
    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 rounded-t-lg">
      <span className="text-sm font-medium text-purple-700 mr-2">
        Custom Toolbar:
      </span>

      {formatButtons.map(({ style, icon: Icon, label, isActive }) => (
        <button
          key={style}
          onClick={() => onToggleInlineStyle(style)}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            isActive
              ? "bg-purple-500 text-white"
              : "bg-white text-purple-600 hover:bg-purple-100"
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

/**
 * CustomToolbarWysiwyg
 * Example of using WysiwygEditor with a fully custom toolbar.
 */
const CustomToolbarWysiwyg = () => {
  return (
    <div className="space-y-4">
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <header className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Custom Toolbar
          </h2>
          <p className="text-sm text-gray-600">
            This example uses a custom toolbar passed via the{" "}
            <code>renderToolbar</code> prop.
          </p>
        </header>

        <div className="p-6 pt-0">
          <WysiwygEditor
            renderToolbar={CustomToolbarExample}
            placeholder="Try using bold, italic, or underline..."
          />
        </div>
      </section>
    </div>
  );
};

export default CustomToolbarWysiwyg;
