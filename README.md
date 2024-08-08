# # MJCC Project
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
## Environment Variables

To run this project, you need to set up a `.env` file in the root directory of your project. This file should contain the necessary environment variables used by the application. Below is a description of each variable and an example of what your `.env` file might look like.

### Required Environment Variables

- **`VITE_NEWS_API_KEY`**:  
  This variable holds the API key used to fetch news data from an external news API service. It's crucial for accessing the news content displayed in the application.

- **`VITE_API_BASE_URL`**:  
  This variable specifies the base URL of the backend API that the application interacts with. It should be set to the URL of the server that provides data to your frontend.

### Example `.env` File

```plaintext
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_API_BASE_URL=http://localhost:3000/api
```