import { useState } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useAsyncContent } from "../hooks/useAsyncContent";
import WysiwygEditor from "../components/wysiwyg-editor";
import { getPlainText } from "../utils/utility-functions";

const AsyncWysiwyg = () => {
  // Async content hook for bonus feature
  const {
    editorState: asyncEditorState,
    isLoading,
    isSaving,
    error,
    lastSaved,
    loadContentById,
    saveCurrentContent,
    setEditorState: setAsyncEditorState,
    clearError,
  } = useAsyncContent();

  const [saveTitle, setSaveTitle] = useState("My Document");

  const handleLoadSample = async (sampleId: string) => {
    await loadContentById(sampleId);
  };

  const handleSave = async () => {
    await saveCurrentContent(saveTitle);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Async Content Loading & Saving
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Demonstrates loading content from a fake API and saving changes back.
      </p>

      {/* Load Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => handleLoadSample("sample-1")}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Load Sample Content
        </button>

        <button
          onClick={() => handleLoadSample("sample-2")}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Load Empty Document
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded mb-4">
          <AlertCircle size={16} className="text-red-500" />
          <span className="text-red-700">{error}</span>
          <button
            onClick={clearError}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Success Display */}
      {lastSaved && !error && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded mb-4">
          <CheckCircle size={16} className="text-green-500" />
          <span className="text-green-700">
            Last saved: {lastSaved.toLocaleString()}
          </span>
        </div>
      )}

      {/* Editor */}
      <div className="mb-4">
        <WysiwygEditor
          value={asyncEditorState}
          onChange={setAsyncEditorState}
          placeholder="Load content or start typing..."
        />
      </div>

      {/* Save Controls */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={saveTitle}
          onChange={(e) => setSaveTitle(e.target.value)}
          placeholder="Document title"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSave}
          disabled={isSaving || !getPlainText(asyncEditorState).trim()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Content
        </button>
      </div>
    </div>
  );
};

export default AsyncWysiwyg;
