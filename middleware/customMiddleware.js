// middleware/customMiddleware.js

// --- Request Logging Middleware ---
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// --- Simple Authentication Middleware ---
// Expects an 'Authorization' header with value 'Bearer secrettoken' for protected routes
const authenticate = (req, res, next) => {
  if (req.path.startsWith('/api/products')) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer secrettoken') {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }
  }
  next();
};

// --- Custom Error Classes ---
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

// --- Async Handler Wrapper ---
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// --- Global Error Handling Middleware ---
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[${new Date().toISOString()}]`, err.name, err.message);
  res.status(status).json({
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error',
    status
  });
};

module.exports = {
  requestLogger,
  authenticate,
  NotFoundError,
  ValidationError,
  asyncHandler,
  errorHandler
};
