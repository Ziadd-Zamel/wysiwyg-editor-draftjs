import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditorState, ContentState } from "draft-js";
import { Toolbar } from "../toolbar";

describe("DefaultToolbar", () => {
  const mockOnChange = vi.fn();
  const mockOnToggleInlineStyle = vi.fn();
  const mockOnToggleBlockType = vi.fn();
  const editorState = EditorState.createWithContent(
    ContentState.createFromText("Test content")
  );

  const defaultProps = {
    editorState,
    onChange: mockOnChange,
    onToggleInlineStyle: mockOnToggleInlineStyle,
    onToggleBlockType: mockOnToggleBlockType,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all format buttons", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("bold-button")).toBeInTheDocument();
    expect(screen.getByTestId("italic-button")).toBeInTheDocument();
    expect(screen.getByTestId("underline-button")).toBeInTheDocument();
  });

  it("has correct toolbar role and aria-label", () => {
    render(<Toolbar {...defaultProps} />);

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveAttribute("aria-label", "Text formatting toolbar");
  });

  it("calls onToggleInlineStyle when format buttons are clicked", () => {
    render(<Toolbar {...defaultProps} />);

    const boldButton = screen.getByTestId("bold-button");
    fireEvent.click(boldButton);

    expect(mockOnToggleInlineStyle).toHaveBeenCalledTimes(1);
    expect(mockOnToggleInlineStyle).toHaveBeenCalledWith("BOLD");
  });

  it("applies custom className", () => {
    render(<Toolbar {...defaultProps} className="custom-class" />);

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toHaveClass("custom-class");
  });
});
