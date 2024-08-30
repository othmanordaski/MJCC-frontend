# MJCC Project

This project is a web application developed for the Ministère de la Jeunesse et des Sports. The application serves as a dynamic news platform, providing the latest updates and information on youth and sports-related activities. It includes various components such as a header, footer, and several pages for different functionalities like news articles, event listings, and user interaction.

The application is built using modern web development technologies, including React, Vite, and TypeScript, ensuring a fast, maintainable, and scalable solution.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/othmanordaski/MJCC-frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd MJCC
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Development

To start the development server, run:

```sh
npm run dev
```

The development server will be accessible at `http://localhost:5173` by default.

## Environment Variables

To run this project, you need to set up a `.env` file in the root directory of your project. This file should contain the necessary environment variables used by the application.

### Required Environment Variables

- `VITE_NEWS_API_KEY`:  
  This variable holds the API key used to fetch news data from an external news API service. It's crucial for accessing the news content displayed in the application.

- `VITE_API_BASE_URL`:  
  This variable specifies the base URL of the backend API that the application interacts with. It should be set to the URL of the server that provides data to your frontend.

### Example `.env` File

```plaintext
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_API_BASE_URL=http://localhost:3000/api
```

## Project Configuration

The project uses Vite as its build tool and development server. The configuration is defined in the `vite.config.js` file at the root of the project.

### Key Configuration Points

1. **Plugins**: The project uses the React plugin for Vite.

2. **Path Aliasing**: The `@` alias is set up to point to the `src` directory, allowing for easier imports in your code.

3. **Server Configuration**: The development server is configured to be accessible from any network interface (`0.0.0.0`), which allows for easier testing on different devices on the same network.

### Example `vite.config.js`

```javascript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
```

## Usage

After starting the development server, you can access the application in your web browser. The server will be running on all network interfaces, so you can also access it from other devices on the same network using your machine's IP address.

## Building for Production

To build the application for production, run:

```sh
npm run build
```

This will create a `dist` directory with the compiled and optimized version of your application.

## Additional Notes

- Make sure to keep your `.env` file secure and do not commit it to version control.
- The `@` alias can be used in your imports to reference files in the `src` directory, e.g., `import Component from '@/components/Component'`.
- When deploying, ensure that your production environment is properly configured to serve the application and that all necessary environment variables are set.

For more information on Vite configuratio
