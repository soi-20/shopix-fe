# Shopix Frontend Repository

This project is built using Next.js and is designed to handle multiple image uploads, data submissions, and theme management. Below you will find comprehensive details on how to set up the project, run it, contribute, and understand the codebase.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [How to Contribute](#how-to-contribute)
- [Features](#features)
- [Edge Cases](#edge-cases)
- [Code Flow](#code-flow)
- [Code Explanation](#code-explanation)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soi-20/shopix-fe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shopix-fe
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the `.env.sample` file to `.env` and fill in the necessary environment variables:
   ```bash
   cp .env.sample .env
   ```

## Running the Project

To run the project locally:

```bash
npm run dev
```

This will start the Next.js development server on `http://localhost:3000`.

## How to Contribute

a
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes.
4. Write or update tests as necessary.
5. Submit a pull request against the main branch.
6. Go through the Github Workflow document thoroughly to get the complete instructions on how to contribute.

Please ensure your code adheres to the established linting and formatting standards.

## Features

- Multiple image uploads.
- Data submission to a backend server.
- Dynamic theme switching between light and dark modes.

## Edge Cases

- Ensure that file uploads do not exceed the size limits.
- Handle network failures during data submission gracefully.
- Validate URLs and file types on the client side to prevent unnecessary server load.

## Code Flow

### Configuration and Setup

- **.env** and **.env.sample**: Configuration files for environment variables.
- **.eslintrc.json**, **.prettierrc**: Configuration files for ESLint and Prettier for code linting and formatting rules.
- **next.config.mjs**: Configuration file for Next.js settings.
- **next-env.d.ts**: TypeScript declaration file for Next.js types.

### Core Functionality

- **lib/db.ts**: Establishes a PostgreSQL database connection using the `pg` library.
- **lib/utils.ts**: Contains utility functions like `cn` for class name merging and `isValidUrl` for URL validation.
- **lib/validation.ts**: Defines Zod schemas for form validation.

### Components

- **components/ui**: Contains reusable UI components like buttons, inputs, cards, and forms.
  - **button.tsx, input.tsx, card.tsx, label.tsx**: Basic UI components with styling.
  - **form.tsx**: Form components integrated with React Hook Form for state management.
- **components/theme-toggle/theme-toggle.tsx**: A toggle switch component for changing theme modes using `next-themes`.

### Pages and Layouts

- **app/uploadData/page.tsx**: A React component for handling multiple image uploads and data submission.
- **app/uploadData/layout.tsx**: Layout component that wraps around other components.

### Actions

- **actions/uploadThing.ts**: Functions to handle file uploads using a fictional API `UTApi`.

### Theme and Styling

- **lib/ThemeWrapper.tsx**: A component that provides theme context to its children, disabling theming on specific routes.

### Server-Side Utilities

- **.next**: Contains build files and cache for Next.js, including dynamic imports and image optimization cache.

### High-Level Interactions

- **Upload Data Flow**: The `page.tsx` uses `uploadThing.ts` actions to handle file uploads and submits data to the server.
- **UI Components**: Reusable UI components are imported and used across different parts of the application, ensuring a consistent look and feel.
- **Database Interaction**: The `db.ts` file is crucial for database interactions, used by server-side pages or APIs to fetch or store data.
- **Theme Management**: `ThemeWrapper.tsx` and `theme-toggle.tsx` manage the application's theme, allowing users to switch between light and dark modes.

## Code Explanation

### Backend Code

1. **lib/db.ts**

   - Sets up a PostgreSQL connection pool. Configures connection details from environment variables and exports the pool for database interactions.

2. **actions/uploadThing.ts**
   - Contains functions for handling file uploads using `UTApi`. Functions include `uploadFiles` and `uploadFromUrl`, which handle file and URL uploads respectively.

### Frontend Code

1. **lib/utils.ts**

   - Utility functions like `cn` for class name management and `isValidUrl` for URL validation.

2. **lib/ThemeWrapper.tsx**

   - Provides theme support, disables theming for specific routes, and manages theme states.

3. **app/uploadData/page.tsx**

   - Handles multiple image uploads, manages image state, and submits data to the server.

4. **app/uploadData/layout.tsx**

   - Acts as a layout wrapper for children components.

5. **components/ui**

   - Contains UI components like `card.tsx`, `input.tsx`, `form.tsx`, `button.tsx`, `label.tsx`, and `insta-card.tsx` for styled UI elements and form management.

6. **components/theme-toggle/theme-toggle.tsx**
   - Toggle switch for theme management, switching between light and dark modes.

Each component and utility file is designed to provide specific functionality to the frontend, ensuring a modular and maintainable codebase. The backend code supports data persistence and file management tasks, crucial for the application's operations.
