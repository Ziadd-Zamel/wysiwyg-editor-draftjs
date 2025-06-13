const UsageInstructions = () => {
  return (
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        Usage Instructions
      </h3>
      <div className="space-y-2 text-sm text-blue-700">
        <p>
          <strong>Keyboard Shortcuts:</strong>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Ctrl+B (Cmd+B on Mac) - Toggle Bold</li>
          <li>Ctrl+I (Cmd+I on Mac) - Toggle Italic</li>
          <li>Ctrl+U (Cmd+U on Mac) - Toggle Underline</li>
        </ul>
        <p className="mt-3">
          <strong>Features Demonstrated:</strong>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Controlled vs Uncontrolled modes</li>
          <li>Custom toolbar rendering</li>
          <li>Read-only mode</li>
          <li>Async content loading and saving</li>
          <li>Error handling and loading states</li>
        </ul>
      </div>
    </div>
  );
};

export default UsageInstructions;
