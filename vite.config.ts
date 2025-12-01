import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "./", // ✅ Add this line
  server: {
    host: "localhost",
    port: 8082,
    proxy: {
      "/api/google-reviews": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      allow: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "public"),
        path.resolve(__dirname),
      ],
    },
  },
  plugins: [
    react(),
    {
      name: "decap-admin-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/admin" || req.url === "/admin/") {
            res.writeHead(302, { Location: "/admin/index.html" });
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
