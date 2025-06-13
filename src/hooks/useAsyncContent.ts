/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { EditorState } from "draft-js";
import { loadContent, saveContent } from "../services/api";
import {
  deserializeEditorState,
  serializeEditorState,
} from "../utils/utility-functions";

// Define return type of the custom hook for type safety and clarity
export interface UseAsyncContentReturn {
  editorState: EditorState;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  lastSaved: Date | null;
  loadContentById: (id: string) => Promise<void>;
  saveCurrentContent: (title: string) => Promise<void>;
  setEditorState: (state: EditorState) => void;
  clearError: () => void;
}

// Custom hook to handle asynchronous loading/saving of editor content
export const useAsyncContent = (): UseAsyncContentReturn => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty() // Start with empty editor state
  );
  const [isLoading, setIsLoading] = useState(false); // Tracks content loading state
  const [isSaving, setIsSaving] = useState(false); // Tracks saving state
  const [error, setError] = useState<string | null>(null); // Holds any load/save error messages
  const [lastSaved, setLastSaved] = useState<Date | null>(null); // Tracks when content was last successfully saved
  const [currentId, setCurrentId] = useState<string | null>(null); // Tracks the currently loaded content ID

  // Clears the current error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Loads content by ID and updates the editor state
  const loadContentById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<ContentData> = await loadContent(id);

      if (response.success && response.data) {
        // Convert stored JSON string back to Draft.js EditorState
        const deserializedState = deserializeEditorState(response.data.content);
        setEditorState(deserializedState);
        setCurrentId(id);
        setLastSaved(response.data.lastModified);
      } else {
        setError(response.error || "Failed to load content");
      }
    } catch (err) {
      // Catch any unexpected errors (e.g., network failure)
      setError("Network error: Unable to load content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Saves current content to backend using the current ID
  const saveCurrentContent = useCallback(
    async (title: string) => {
      if (!currentId) {
        // Prevent saving if no content has been loaded yet
        setError("No content ID specified for saving");
        return;
      }

      setIsSaving(true);
      setError(null);

      try {
        const contentData: ContentData = {
          id: currentId,
          title,
          content: serializeEditorState(editorState), // Convert Draft.js state to JSON string
          lastModified: new Date(), // Set new save timestamp
        };

        const response: ApiResponse<ContentData> = await saveContent(
          contentData
        );

        if (response.success && response.data) {
          setLastSaved(response.data.lastModified);
        } else {
          setError(response.error || "Failed to save content");
        }
      } catch (err) {
        setError("Network error: Unable to save content");
      } finally {
        setIsSaving(false);
      }
    },
    [editorState, currentId] // Dependencies for useCallback
  );

  // Expose state and functions for consuming components
  return {
    editorState,
    isLoading,
    isSaving,
    error,
    lastSaved,
    loadContentById,
    saveCurrentContent,
    setEditorState,
    clearError,
  };
};
