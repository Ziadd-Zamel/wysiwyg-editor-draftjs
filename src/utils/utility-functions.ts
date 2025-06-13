import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";

// Converts the current EditorState into a raw JSON string.
// Useful for saving editor content to a database or localStorage.
export const serializeEditorState = (editorState: EditorState): string => {
  const contentState = editorState.getCurrentContent();
  return JSON.stringify(convertToRaw(contentState));
};

// Restores an EditorState from a previously serialized JSON string.
// Falls back to an empty editor if parsing fails.
export const deserializeEditorState = (
  serializedState: string
): EditorState => {
  try {
    const rawContentState = JSON.parse(serializedState);
    const contentState = convertFromRaw(rawContentState);
    return EditorState.createWithContent(contentState);
  } catch (error) {
    console.warn("Failed to deserialize editor state:", error);
    return EditorState.createEmpty();
  }
};

// Extracts plain text content from the EditorState (no formatting).
// Useful for character counts, previews, or search indexing.
export const getPlainText = (editorState: EditorState): string => {
  return editorState.getCurrentContent().getPlainText();
};

// Creates a new EditorState instance from a plain text string.
// Useful for initializing the editor with basic content.
export const createEditorStateFromText = (text: string): EditorState => {
  const contentState = ContentState.createFromText(text);
  return EditorState.createWithContent(contentState);
};
