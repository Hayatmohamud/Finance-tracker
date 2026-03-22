// utils/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for Finance Tracker app",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change if your server URL is different
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files with JSDoc comments
};

// Create swagger specs
export const swaggerSpecs = swaggerJsdoc(options);

// Function to setup Swagger in Express app
export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
