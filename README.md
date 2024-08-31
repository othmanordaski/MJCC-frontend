# MJCC Project

[Previous content remains the same up to the Docker Support section]

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
