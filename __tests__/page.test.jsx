import { render, screen } from "@testing-library/react";
import News from "../src/app/page";

describe("News component", () => {
  beforeEach(() => {
    // Clear the mock implementation of fetch
    fetch.resetMocks();
  });

  it("renders the Page component without crashing", () => {
    render(<News />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders posts correctly when posts are available", async () => {
    const mockTopStories = [1, 2, 3];
    const mockPosts = [
      {
        by: "John",
        descendants: 0,
        id: 1,
        score: 10,
        time: 1600000000,
        title: "Test Post 1",
        type: "story",
        url: "https://example.com",
      }
    ];

    fetch.mockResponseOnce(JSON.stringify(mockTopStories));
    mockPosts.forEach((post) => {
      fetch.mockResponseOnce(JSON.stringify(post));
    });

    render(<News />);
  });
});
