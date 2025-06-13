import WysiwygEditor from "../components/wysiwyg-editor";
import { createEditorStateFromText } from "../utils/utility-functions";

const ReadOnlyWysiwyg = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Read-only Mode
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Content is displayed without editing capabilities or toolbar.
        </p>

        <WysiwygEditor
          value={createEditorStateFromText(
            "This content is read-only and cannot be edited."
          )}
          readOnly
        />
      </div>
    </div>
  );
};

export default ReadOnlyWysiwyg;
