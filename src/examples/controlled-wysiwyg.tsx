import { FileText } from "lucide-react";
import { useState } from "react";
import {
  createEditorStateFromText,
  getPlainText,
} from "../utils/utility-functions";
import WysiwygEditor from "../components/wysiwyg-editor";

const ControlledWysiwyg = () => {
  const [controlledState, setControlledState] = useState(() =>
    createEditorStateFromText("")
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Controlled Mode
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          The editor state is managed by the parent component. Changes are
          handled via the onChange callback.
        </p>

        <WysiwygEditor
          value={controlledState}
          onChange={setControlledState}
          placeholder="Type in controlled mode..."
        />
      </div>
      <div className="bg-white p-3 border-gray-200 rounded text-sm">
        <strong>Character count:</strong> {getPlainText(controlledState).length}
      </div>
    </div>
  );
};

export default ControlledWysiwyg;
