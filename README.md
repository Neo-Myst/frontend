
# Frontend: React + TypeScript + Vite

## Prerequisites

- **Node.js 22** (required for development)
  - Install it using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) or directly from the [Node.js official website](https://nodejs.org/).
  - To check if Node.js is installed, run:
    ```bash
    node -v
    ```
    Ensure the version is `22.x`.

---

## How to set up and run the application:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/PBL-Akatsuki/frontend.git
   ```

2. **Navigate to the project root directory**:

   ```bash
   cd frontend
   ```

3. **Run the application during development**:
   Use Vite's development server with hot reloading:
   ```bash
   npm run dev
   ```
   The website will be available at the address displayed in the terminal, typically [http://localhost:5173](http://localhost:5173).

4. **Build the Docker image for production**:

   ```bash
   docker build -t react-vite-app .
   ```

5. **Run the Docker container** for a production-grade environment:

   ```bash
   docker run -p 80:80 react-vite-app
   ```

6. **Access the application**:  
   The website will be available at [http://localhost:80](http://localhost:80).

---

## How it works:

- During development, `npm run dev` uses Vite's development server to provide fast, hot-reloading of code changes.
- For production, the Dockerfile compiles the React application into optimized static files using Vite's build process. These files are then served through Nginx, a high-performance web server, ensuring a lightweight, production-ready environment for hosting your frontend application.
