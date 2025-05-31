const bcrypt = require('bcrypt');
const express = require('express');
const Employees = require('../models/employee');

const emprouter = express.Router();

emprouter.post('/register', async (req, res) => {
    const { name, email_id, phone_no, role, department, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
      const maxId = await Employees.max('id');
      const newId = maxId ? maxId + 1 : 1;
        
      let hashedPassword;
      if (password === "not_an_hr") {
        hashedPassword = confirmPassword; 
      } else {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      await Employees.create({
        id: newId,
        name,
        email_id,
        phone_no,
        role,
        department,
        password: hashedPassword
      });
      
      console.log(`Employee account for ${name} created!`);
      if (confirmPassword === 'not_an_hr') {
        res.redirect('/employees');
      } 
      else {
        res.redirect('/');
      } 
    } catch (err) {
      res.status(500).json({ error: "User not created", details: err });
    }
  });
  
  emprouter.post('/api/login', async (req, res) => {
  const { email_id, password } = req.body;
  console.log('Login attempt:', email_id);

  try {
    const employee = await Employees.findOne({ where: { email_id } });

    if (!employee) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (employee.department !== 'HR' && employee.department !== 'Admin') {
      return res.status(403).json({ message: `Access denied for ${employee.name}` });
    }

    const is_match = await bcrypt.compare(password, employee.password);

    if (!is_match) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
  module.exports = emprouter;