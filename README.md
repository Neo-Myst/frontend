# Frontend: React + TypeScript + Vite

## How to set up and run the application:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/PBL-Akatsuki/frontend.git
   ```

2. **Navigate to the project root directory**:

   ```bash
   cd frontend
   ```

3. **Build the Docker image**:

   ```bash
   docker build -t react-vite-app .
   ```

4. **Run the Docker container**:

   ```bash
   docker run -p 80:80 react-vite-app
   ```

5. **Access the application**:  
   The website will be available at [http://localhost:80](http://localhost:80)

---

## How it works:

The Dockerfile compiles the React application using Vite into optimized static files for production. These files are then served through Nginx, which acts as a high-performance web server. This setup ensures a lightweight, production-ready environment for hosting your frontend application.
