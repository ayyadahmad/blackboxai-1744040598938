class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      err.statusCode = 400;
      err.message = 'File size too large. Maximum size is 5MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      err.statusCode = 400;
      err.message = 'Unexpected field name in upload form.';
    }
  }

  // Handle CORS errors
  if (err.message.includes('CORS')) {
    err.statusCode = 403;
    err.message = 'CORS error: Request blocked due to security policy.';
  }

  // Handle file system errors
  if (err.code === 'ENOENT') {
    err.statusCode = 500;
    err.message = 'Server error: Could not access upload directory.';
  }

  // Log error details
  console.error('Error details:', {
    name: err.name,
    code: err.code,
    message: err.message,
    path: req.path,
    method: req.method,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production error response
    if (err.isOperational || err.name === 'MulterError') {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Programming or unknown errors
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
};

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  AppError,
  handleError,
  catchAsync
};