import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import HeroDisplay from "../../components/HeroDisplay";
import { mockProps } from "./constants/constants";

describe("HeroDisplay Component", () => {
  it("renders character details correctly for all characters", () => {
    /*
     * Iterate over each character in the mockProps.data array.
     * The forEach method loops through each character in the array and runs the test for each one.
     */
    mockProps.data.forEach((character, index) => {
      /*
       * Log the current character being tested for debugging purposes.
       * This helps track which character is currently being processed.
       */
      console.log(`Running test for character #${index + 1}:`, character.name);

      /*
       * Create a new updatedProps object that includes the current character's data.
       * This allows us to pass the character-specific data to HeroDisplay.
       */
      const updatedProps = { ...mockProps, character }; // Update props for each character

      /*
       * Render the HeroDisplay component with the updated props.
       * This triggers the rendering of the component with the props corresponding to the current character.
       */
      render(<HeroDisplay {...updatedProps} />);

      /*
       * Log the props being passed to HeroDisplay for debugging.
       * This helps verify that the correct props are being passed into the component.
       */
      console.log(
        "Props being passed to HeroDisplay:",
        updatedProps.character.name
      );

      /*
       * Get the rendered element by its data-testid ("character-name").
       * This allows us to query the DOM for the element that displays the character name.
       */
      const title = screen.getByTestId("character-name");

      /*
       * Log the rendered character name to verify if the rendering is correct.
       * The rendered text content should match the expected character name.
       */
      console.log("Rendered character name:", title.textContent + "\n");

      /*
       * Assert that the rendered character name matches the expected name.
       * This ensures that the HeroDisplay component is correctly rendering the character's name.
       */
      expect(title.textContent).toBe(character.name);

      /*
       * Cleanup the DOM after each iteration to ensure tests don't interfere with each other.
       * The cleanup function ensures that the DOM is cleared between each test.
       */
      cleanup(); // Optional explicit cleanup (not needed if jest's default cleanup is used)
    });
  });
});
