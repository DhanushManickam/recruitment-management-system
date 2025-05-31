const express = require('express');
const {verifyToken} = require('../utils/jwt');  
const router = express.Router();

router.get('/protected-data', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

module.exports = router;