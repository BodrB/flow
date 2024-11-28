import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    /*
     * Render the Footer component into the DOM.
     * The render function from React Testing Library renders the Footer component to make it available for testing.
     */
    render(<Footer />);

    /*
     * Query the Footer element using its test ID.
     * screen.getByTestId("footer") searches the DOM for an element with a `data-testid="footer"`.
     * This is useful for identifying specific elements in your component.
     */
    const footer = screen.getByTestId("footer"); // Assuming you have a test ID like data-testid="footer"

    /*
     * Assert that the Footer element is present in the document.
     * The test checks whether the `footer` element is rendered correctly in the DOM.
     */
    expect(footer).toBeInTheDocument();
  });
});
