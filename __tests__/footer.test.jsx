import { render, screen } from "@testing-library/react";
import Footer from "../src/app/footer";

describe("Footer", () => {
  it("renders the Footer component without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("All rights reserved ©")).toBeInTheDocument();
  });

  it("create a snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
