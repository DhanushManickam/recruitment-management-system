const {verifyToken} = require('../utils/jwt.js');
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
      }
    
      const decoded = verifyToken(token);
    
      if (!decoded) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
    
      req.user = decoded;  
      next();
    };
    
    module.exports = authMiddleware;