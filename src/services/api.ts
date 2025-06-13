// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fake API to load content
export const loadContent = async (
  id: string
): Promise<ApiResponse<ContentData>> => {
  await delay(1000);

  // Simulate different responses based on ID
  const mockData: Record<string, ContentData> = {
    "sample-1": {
      id: "sample-1",
      title: "Welcome Document",
      content: JSON.stringify({
        blocks: [
          {
            key: "sample-key-1",
            text: "Welcome to the WYSIWYG Editor! This content was loaded asynchronously.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              { offset: 0, length: 7, style: "BOLD" },
              { offset: 35, length: 6, style: "ITALIC" },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "sample-key-2",
            text: "You can format text with bold, italic, and underline styles.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              { offset: 25, length: 4, style: "BOLD" },
              { offset: 31, length: 6, style: "ITALIC" },
              { offset: 43, length: 9, style: "UNDERLINE" },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      lastModified: new Date("2024-01-15T10:30:00Z"),
    },
    "sample-2": {
      id: "sample-2",
      title: "Empty Document",
      content: JSON.stringify({
        blocks: [
          {
            key: "empty-key",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      lastModified: new Date("2024-01-15T09:00:00Z"),
    },
  };

  const data = mockData[id];

  if (data) {
    return {
      success: true,
      data,
    };
  } else {
    return {
      success: false,
      error: "Content not found",
    };
  }
};

// Fake API to save content
export const saveContent = async (
  content: ContentData
): Promise<ApiResponse<ContentData>> => {
  await delay(800);

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: "Network error: Failed to save content",
    };
  }

  // Simulate successful save
  const savedContent: ContentData = {
    ...content,
    lastModified: new Date(),
  };

  return {
    success: true,
    data: savedContent,
  };
};
