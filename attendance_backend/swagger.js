const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Attendance Tracker API',
      version: '1.0.0',
      description: 'Backend API for college attendance tracker app. Handles user and attendance management, dashboard, and notifications.'
    },
    // servers: [
    //   {
    //     url: 'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3001/',
    //     description: 'Secure backend'
    //   }
    // ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
