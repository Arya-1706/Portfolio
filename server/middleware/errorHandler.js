
export const notFound = (req, res) => {
  res.status(404).json({
    message: `Not found: ${req.originalUrl}`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'That slug already exists'
    });
  }

  const status = err.status || 500;

  const message =
    status === 500 && process.env.NODE_ENV === 'production'
      ? 'Server error'
      : err.message;

  res.status(status).json({ message });
};
