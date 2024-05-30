import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import 'dotenv/config';


// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ethio Job Scraper API',
    version: '1.0.0',
    description:
      'This is the API documentation for the Ethio Job Scraper API. It retrieves job listings from the database with optional filters and sorting options.<br/> Use the x-api-key header for authentication. Ensure that the x-api-key header is included in your request to access this endpoint.<br/><br/>Example:<br/><br/> x-api-key = $2b$10$vC05UE31dob2UZoNKEuyzOnBk/.6u/N1vtcFHAkVYnuSD8LyyS6GC',
  },
  security: [
    { ApiKeyAuth: [] }, // Reference the security scheme
  ],
  servers: [
    {
      url: process.env.URL || 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./routes/jobRoutes.*'], // Files containing annotations for the Swagger doc
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
