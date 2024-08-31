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

## Docker Support

This project includes Docker support for easy containerization and development. The Docker setup is optimized for a development environment, allowing you to run the application with hot-reloading and other development features.

### Prerequisites

- Docker installed on your machine
- Docker Compose (usually comes with Docker Desktop)

### Docker Configuration

The project includes two main Docker-related files:

1. `Dockerfile`: Defines how to build the Docker image for the application.
2. `docker-compose.yml`: Defines the services, networks, and volumes for your application.

#### Dockerfile

```dockerfile
# Use Node.js image for development
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Expose the port that Vite uses in development
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
```

This Dockerfile is set up for development purposes:

- It uses a Node.js Alpine image as the base.
- It installs all dependencies, including development dependencies.
- It exposes port 5173, which is the default port for Vite's development server.
- The command runs the development server, which includes features like hot-reloading.

#### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - VITE_NEWS_API_KEY=${VITE_NEWS_API_KEY}
      - VITE_API_BASE_URL=${VITE_API_BASE_URL}
```

This docker-compose file defines a single service for the application:

- It maps port 5173 on the host to port 5173 in the container.
- It sets up a volume to sync the current directory with the /app directory in the container, enabling hot-reloading.
- It excludes the node_modules directory from the volume sync to use the container's installed modules.
- It passes the necessary environment variables to the container.

### Building and Running with Docker

1. Build the Docker image:

   ```sh
   docker-compose build
   ```

2. Start the Docker container:

   ```sh
   docker-compose up
   ```

3. To stop the container:
   ```sh
   docker-compose down
   ```

### Accessing the Application

Once the Docker container is running, you can access the application at `http://localhost:5173`.

## Additional Notes

- Make sure to keep your `.env` file secure and do not commit it to version control.
- The `@` alias can be used in your imports to reference files in the `src` directory, e.g., `import Component from '@/components/Component'`.
- When using Docker for development, any changes you make to your local files will be reflected in the running container thanks to the volume mapping.
- For production deployments, you may need to create a separate Dockerfile that builds the application and serves it using a web server like Nginx.
- Ensure your `.env` file is properly configured and in the same directory as your `docker-compose.yml` file when using Docker.

For more information on Vite configuration and Docker best practices, refer to their respective documentation:

- [Vite Documentation](https://vitejs.dev/config/)
- [Docker Documentation](https://docs.docker.com/)
