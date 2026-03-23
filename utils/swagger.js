import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for Finance Tracker",
    },
    servers: [
      {
        url: "https://finance-tracker-29wp.onrender.com", // URL-kaaga Render
        description: "Production server",
      },
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // IMPORTANT
};

export const swaggerSpecs = swaggerJSDoc(options);
