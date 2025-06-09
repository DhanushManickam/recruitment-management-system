const express = require('express');
const {emp_login, emp_register, emp_profile} = require('../controllers/employee');
const authentication = require('../middlewares/auth');
const emprouter = express.Router();

emprouter.post('/register', emp_register);
  
emprouter.post('/api/login',emp_login);

emprouter.get('/api/emp_profile', authentication, emp_profile);
  
module.exports = emprouter;