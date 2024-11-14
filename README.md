# frontend: React + TypeScript + Vite

## How to build docker image:

```bash
docker build -t react-vite-app .
```

## How to run it:

```bash
docker run -p 80:80 react-vite-app
```

And the website will be availabe on [http://localhost:80](http://localhost:80)

#### How it works:

The Dockerfile compiles the application into optimized static files and uses Nginx to efficiently serve the app to users. This setup ensures a lightweight, production-ready environment for hosting your frontend.
