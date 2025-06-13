import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditorState } from "draft-js";
import WysiwygEditor from "../wysiwyg-editor";

describe("WysiwygEditor", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default placeholder", () => {
    render(<WysiwygEditor />);

    expect(screen.getByText("Start typing...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<WysiwygEditor placeholder="Write something..." />);

    expect(screen.getByText("Write something...")).toBeInTheDocument();
  });

  it("renders toolbar in non-readonly mode", () => {
    render(<WysiwygEditor />);

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toBeInTheDocument();
  });

  it("hides toolbar in readonly mode", () => {
    render(<WysiwygEditor readOnly={true} />);

    const toolbar = screen.queryByRole("toolbar");
    expect(toolbar).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<WysiwygEditor className="custom-editor" />);

    const editorContainer = screen
      .getByText("Start typing...")
      .closest(".wysiwyg-editor");
    expect(editorContainer).toHaveClass("custom-editor");
  });

  it("works as controlled component", () => {
    const editorState = EditorState.createEmpty();
    render(<WysiwygEditor value={editorState} onChange={mockOnChange} />);

    // Simulate typing
    const editor = screen.getByRole("textbox");
    fireEvent.focus(editor);
    fireEvent.input(editor, { target: { textContent: "test" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("works as uncontrolled component", () => {
    render(<WysiwygEditor />);

    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();

    // Should not throw errors when typing without onChange prop
    fireEvent.focus(editor);
    fireEvent.input(editor, { target: { textContent: "test" } });
  });

  it("renders custom toolbar when provided", () => {
    const customToolbar = vi.fn(() => (
      <div data-testid="custom-toolbar">Custom Toolbar</div>
    ));

    render(<WysiwygEditor renderToolbar={customToolbar} />);

    expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument();
    expect(customToolbar).toHaveBeenCalledWith(
      expect.objectContaining({
        editorState: expect.any(Object),
        onToggleInlineStyle: expect.any(Function),
        onToggleBlockType: expect.any(Function),
      })
    );
  });
});
