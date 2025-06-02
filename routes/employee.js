const express = require('express');
const {emp_login, emp_register} = require('../controllers/employee');
const emprouter = express.Router();

emprouter.post('/register', emp_register);
  
emprouter.post('/api/login',emp_login);
  
module.exports = emprouter;