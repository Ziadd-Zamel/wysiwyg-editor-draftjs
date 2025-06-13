import AsyncWysiwyg from "../examples/async-wysiwyg";
import ControlledWysiwyg from "../examples/controlled-wysiwyg";
import ReadOnlyWysiwyg from "../examples/read-only-wysiwyg";
import UnControlledWysiwyg from "../examples/uncontrolled-wysiwyg";
import CustomToolbarWysiwyg from "../examples/wysiwyg-with-custom-toolbar";
import UsageInstructions from "./usage-instructions";

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            WYSIWYG Editor Demo
          </h1>
          <p className="text-lg text-gray-600">
            A flexible React component built with Draft.js
          </p>
        </div>

        {/* Usage Instructions */}
        <UsageInstructions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Controlled Mode */}
          <ControlledWysiwyg />

          {/* Uncontrolled Mode */}
          <UnControlledWysiwyg />

          {/* Custom Toolbar */}
          <CustomToolbarWysiwyg />

          {/* Read-only Mode */}
          <ReadOnlyWysiwyg />
        </div>
        <AsyncWysiwyg />
      </div>
    </div>
  );
};

export default DemoPage;
