/**
 * Centralized Error Handler Middleware
 * Provides consistent error responses with helpful messages
 */

// Custom error class for API errors
class APIError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

// Error code mappings with user-friendly messages
const ERROR_CODES = {
  VALIDATION_ERROR: { status: 400, message: 'Invalid input data' },
  UNAUTHORIZED: { status: 401, message: 'Authentication required' },
  FORBIDDEN: { status: 403, message: 'Access denied' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  DUPLICATE: { status: 409, message: 'Resource already exists' },
  RATE_LIMITED: { status: 429, message: 'Too many requests, please slow down' },
  AI_ERROR: { status: 503, message: 'AI service temporarily unavailable' },
  DB_ERROR: { status: 503, message: 'Database service unavailable' },
  PARSE_ERROR: { status: 422, message: 'Unable to parse the uploaded file' },
  FILE_ERROR: { status: 400, message: 'Invalid file format or size' }
};

// Map known error types to user-friendly responses
function normalizeError(err) {
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: messages.join(', ')
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return {
      statusCode: 409,
      code: 'DUPLICATE',
      message: `A record with this ${field} already exists`
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return {
      statusCode: 401,
      code: 'UNAUTHORIZED',
      message: 'Invalid authentication token'
    };
  }

  if (err.name === 'TokenExpiredError') {
    return {
      statusCode: 401,
      code: 'TOKEN_EXPIRED',
      message: 'Your session has expired, please login again'
    };
  }

  // OpenAI errors
  if (err.message?.includes('OpenAI') || err.message?.includes('API key')) {
    return {
      statusCode: 503,
      code: 'AI_ERROR',
      message: 'AI analysis service is temporarily unavailable'
    };
  }

  // File parsing errors
  if (err.message?.includes('parse') || err.message?.includes('PDF')) {
    return {
      statusCode: 422,
      code: 'PARSE_ERROR',
      message: 'Unable to read the uploaded file. Please ensure it\'s a valid PDF or DOCX.'
    };
  }

  // Multer file errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return {
      statusCode: 400,
      code: 'FILE_ERROR',
      message: 'File is too large. Maximum size is 5MB.'
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return {
      statusCode: 400,
      code: 'FILE_ERROR',
      message: 'Unexpected file field'
    };
  }

  // Default error
  return null;
}

function errorHandler(err, req, res, next) {
  // Log error for debugging (but don't log in production for sensitive errors)
  const isDev = process.env.NODE_ENV !== 'production';
  
  if (isDev) {
    console.error("❌ ERROR:", {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  } else {
    console.error("❌ ERROR:", err.message, req.path);
  }

  // Normalize the error
  const normalized = normalizeError(err);
  
  const statusCode = normalized?.statusCode || err.statusCode || 500;
  const code = normalized?.code || err.code || 'INTERNAL_ERROR';
  const message = normalized?.message || err.message || 'Something went wrong';

  // Build response
  const response = {
    success: false,
    error: {
      code,
      message,
      // Only include path in development
      ...(isDev && { path: req.path })
    }
  };

  // Include stack trace in development
  if (isDev && !err.isOperational) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

// Export both the middleware and the APIError class
module.exports = errorHandler;
module.exports.APIError = APIError;
module.exports.ERROR_CODES = ERROR_CODES;
