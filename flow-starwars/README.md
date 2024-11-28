# Flow-Starwars Portfolio

This project is a portfolio website built with Next.js, showcasing a variety of Star Wars-themed components and designs. The site includes interactive displays, custom components, and a styled layout using modern front-end technologies. The project is structured in a way that supports easy maintenance and scalability.

## Project Structure

The structure of the project is organized as follows:

```plaintext
FLOW-STARWARS/
├── .next/ # Generated output for production
├── coverage/ # Test coverage reports
├── node_modules/ # Project dependencies
├── public/ # Public assets like images and icons
│ ├── favicon.ico # Favicon for the site
│ └── fonts/ # Custom fonts used in the project
├── src/ # Main source code
│ ├── tests/ # Unit tests
│ │ ├── HeroDisplay.test.tsx # Tests for HeroDisplay component
│ │ ├── Footer.test.tsx # Tests for Footer component
│ │ └── page.test.tsx # Tests for page components
│ ├── app/ # Main app layout and components
│ │ ├── flow/ # Star Wars-related visual flow components
│ │ ├── fonts/ # Font-related assets and configurations
│ │ └── globals.css # Global CSS styles
│ ├── components/ # Reusable components like Header, Footer, HeroDisplay
│ │ ├── Footer/ # Footer component and styles
│ │ ├── Header/ # Header component and styles
│ │ └── HeroDisplay/ # HeroDisplay component and styles
│ ├── constants/ # Constants and configuration files
│ ├── layout.tsx # Main layout file for pages
│ ├── page.tsx # Main page component
│ └── variables.module.css # Variables for modular CSS
├── .eslintignore # ESLint ignore configuration
├── jest.config.ts # Jest testing configuration
├── jest.setup.js # Jest setup file
├── next-env.d.ts # TypeScript environment configuration for Next.js
├── next.config.ts # Configuration file for Next.js
├── package.json # Project dependencies and scripts
└── README.md # Project documentation (this file)
```

## Jest Configuration

This project uses Jest for unit testing. To ensure smooth and efficient testing, two key files are included in the setup: `jest.config.ts` and `jest.setup.js`. Below is an explanation of their roles:

### `jest.config.ts`

The `jest.config.ts` file is the central configuration file for Jest. It defines how tests are run and customizes Jest to suit the project. Here's why it's important:

- **Custom Configuration**: Specifies paths to test files, directories to ignore, and file extensions to process.
- **TypeScript Integration**: Ensures Jest can handle TypeScript files using tools like `ts-jest`.
- **Module Resolution**: Configures Jest to resolve custom aliases (e.g., `@components` or `@utils`).
- **CSS/SCSS and Asset Handling**: Transforms CSS Modules, SCSS files, and imported assets so they don't break during tests.
- **Test Coverage**: Defines how coverage reports are generated and specifies thresholds for test coverage.

Example :

```typescript
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
```

## `package.json` Overview

The `package.json` file is the central configuration for managing the project's dependencies, scripts, and metadata. Below is a detailed explanation of its contents.

### Project Metadata

- **`name`**: `"flow-starwars"` - The name of the project.
- **`version`**: `"0.1.0"` - The current version of the project.
- **`private`**: `true` - Ensures the project cannot be accidentally published to a public registry like npm.

---

### Scripts

The `scripts` section defines command-line shortcuts for various tasks in the development lifecycle:

- **`dev`**: Runs the Next.js development server locally.  
  **Command**: `yarn dev`  
  **Usage**: Starts the app in development mode for local testing.
- **`build`**: Builds the Next.js app for production.  
  **Command**: `yarn build`  
  **Usage**: Compiles the app into optimized production-ready files.
- **`start`**: Runs the production build on port `8081`.  
  **Command**: `yarn start`  
  **Usage**: Used to serve the app in production mode.
- **`lint`**: Runs ESLint to check and fix code issues.  
  **Command**: `yarn lint`  
  **Usage**: Ensures code quality and adherence to linting rules.
- **`test`**: Runs the Jest test suite.  
  **Command**: `yarn test`  
  **Usage**: Executes unit tests for the project.

---

### Dependencies

The `dependencies` section includes libraries required for the app to run in production:

- **`@swc/jest`**: A fast JavaScript/TypeScript transpiler for Jest testing.
- **`@xyflow/react`**: A library related to flow-based visualizations.
- **`antd`**: A popular React UI library for creating components with a modern design.
- **`framer-motion`**: A library for animations in React.
- **`next`**: The Next.js framework for server-side rendering and static site generation.
- **`react`** & **`react-dom`**: React's core library and DOM rendering utilities.
- **`sass`**: A CSS preprocessor for using SCSS in styling.

---

### Development Dependencies

The `devDependencies` section includes tools required for development and testing but not for production:

- **Babel Presets**:

  - **`@babel/preset-env`**: Transpiles modern JavaScript for backward compatibility.
  - **`@babel/preset-react`**: Transpiles JSX syntax for React components.

- **SWC Core**:

  - **`@swc/core`**: A fast compiler for JavaScript/TypeScript.

- **Testing Libraries**:

  - **`@testing-library/dom`**, **`@testing-library/react`**: Libraries for testing DOM and React components.
  - **`@testing-library/jest-dom`**: Provides custom Jest matchers for DOM assertions.
  - **`jest`**: JavaScript testing framework.
  - **`jest-environment-jsdom`**: Simulates a browser environment for Jest tests.
  - **`@types/jest`**: TypeScript types for Jest.

- **TypeScript Tools**:

  - **`typescript`**: TypeScript language compiler.
  - **`ts-node`**: Executes TypeScript files directly.
  - **`@types/react`**, **`@types/react-dom`**, **`@types/node`**: TypeScript types for React, React DOM, and Node.js.

- **Linting**:

  - **`eslint`**: JavaScript linting utility.
  - **`eslint-config-next`**: Predefined ESLint configuration for Next.js.

- **Other Tools**:
  - **`identity-obj-proxy`**: Mocks CSS module imports for testing.

---

### Summary

The `package.json` file is crucial for:

- Managing dependencies and ensuring the correct libraries are installed.
- Defining key development scripts to streamline the workflow.
- Specifying tools and configurations for testing, linting, and building the application.

Using `yarn` instead of `npm` helps provide faster dependency management, a streamlined installation process, and a better lockfile mechanism for consistency.
