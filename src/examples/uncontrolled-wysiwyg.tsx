import { FileText } from "lucide-react";
import WysiwygEditor from "../components/wysiwyg-editor";

const UnControlledWysiwyg = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Uncontrolled Mode
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          The editor manages its own internal state. No external state
          management required.
        </p>

        <WysiwygEditor placeholder="Type in uncontrolled mode..." />
      </div>
    </div>
  );
};

export default UnControlledWysiwyg;
