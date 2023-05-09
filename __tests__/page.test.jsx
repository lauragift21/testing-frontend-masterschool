import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import News from "../src/app/page";

const server = setupServer(
  // Mock the response for the top stories
  rest.get(
    "https://hacker-news.firebaseio.com/v0/newstories.json",
    (req, res, ctx) => {
      return res(ctx.json([1, 2, 3]));
    }
  ),
  rest.get(
    "https://hacker-news.firebaseio.com/v0/item/:id.json",
    (req, res, ctx) => {
      const { id } = req.params;
      // Mock the response for each item
      return res(
        ctx.json({
          id,
          title: `Post ${id}`,
          url: `https://example.com/${id}`,
          score: 100,
          by: "John Doe",
          time: 1620700000,
        })
      );
    }
  )
);

// Setup before running the tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("News", () => {
  it("renders the loading state initially", () => {
    // Render the News component
    const { getByTestId } = render(
      <div>
        <News />
      </div>
    );

    // Check if the loading state is rendered initially
    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders the posts", async () => {
    // Mock the response for the top stories
    const topStories = [1, 2, 3]; // Example story IDs
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(topStories),
    });

    // Render the News component
    render(
      <div>
        <News />
      </div>
    );

    // Check if the loading state is rendered initially
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // Wait for the posts to be loaded
    await waitFor(() => {
      screen.getByText("Post 1");
      screen.getByText("Post 2");
      screen.getByText("Post 3");
    });
  });
});
