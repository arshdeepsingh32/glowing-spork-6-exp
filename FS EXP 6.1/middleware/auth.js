// middleware/auth.js
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or incorrect' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== 'mysecrettoken') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};
