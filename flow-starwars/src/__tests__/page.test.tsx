import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders a main", () => {
    /*
     * Render the Page component.
     * The render function from React Testing Library renders the Page component into the virtual DOM for testing.
     */
    render(<Page />);

    /*
     * Query for the 'main' element by its role.
     * Using screen.getByRole('main') is a way to query the DOM for the <main> element, which is expected in the Page component.
     */
    const main = screen.getByRole("main");

    /*
     * Assert that the 'main' element is in the document.
     * This checks if the 'main' element rendered by the Page component is actually present in the DOM.
     */
    expect(main).toBeInTheDocument();
  });
});
