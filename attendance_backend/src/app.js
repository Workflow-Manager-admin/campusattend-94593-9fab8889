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
/**
 * CORS OPTIONS CONFIGURATION - Robust for Dev/Prod & Docs
 * - Configures allowed origins depending on NODE_ENV and explicitly documents CORS setup.
 */
const ENV = process.env.NODE_ENV;
const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3000',
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3001',
];
const PROD_ALLOWED_ORIGINS = [
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3000',
  'https://vscode-internal-385-beta.beta01.cloud.kavia.ai:3001',
];
// Allow all localhost for dev, only preview/prod for production. Also allow Swagger UI directly from backend origin.
const allowedOrigins = ENV === 'production'
  ? PROD_ALLOWED_ORIGINS
  : DEFAULT_ALLOWED_ORIGINS;

function checkOrigin(origin, callback) {
  // No origin means curl/server-to-server (permit), or check against allowed list.
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}

const corsOptions = {
  origin: checkOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
  // Always set Vary if responding to origin for correct CORS handling
  preflightContinue: false,
};

/** Global CORS middleware for all routes */
app.use(cors(corsOptions));

/**
 * Explicit preflight handler - guarantees Access-Control-Allow-Origin for OPTIONS
 */
app.options('*', cors(corsOptions));

app.use('/docs', swaggerUi.serve, (req, res, next) => {
  const dynamicSpec = {
    ...swaggerSpec,
    // servers: [
    //   {
    //     url: `${req.protocol}://${req.get('host')}`,
    //   },
    // ],
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
