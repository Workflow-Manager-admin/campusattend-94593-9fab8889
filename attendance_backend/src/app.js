const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

// Initialize express app
const app = express();

/**
 * CORS CONFIGURATION SECTION
 * Allow requests from Swagger UI and frontend (adjust origins as needed for production).
 */
const allowedOrigins = [
  'http://localhost:3000', // likely React dev server
  'http://localhost:3001', // likely backend (Swagger UI may use this)
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3000',  // frontend preview url
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3001',  // backend API url (Swagger UI)
];

// Use a dynamic origin function so CORS headers only allow approved sources
app.use(cors({
  origin: function(origin, callback) {
    // Allow direct server-to-server or curl/no-origin requests, or if origin is allowed
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}));

// Explicitly handle preflight OPTIONS for all routes
app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}));

app.use('/docs', swaggerUi.serve, (req, res, next) => {
  const dynamicSpec = {
    ...swaggerSpec,
    servers: [
      {
        url: `${req.protocol}://${req.get('host')}`,
      },
    ],
  };
  swaggerUi.setup(dynamicSpec)(req, res, next);
});

// Parse JSON request body
app.use(express.json());

// Mount routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

module.exports = app;
