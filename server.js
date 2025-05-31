const express = require('express');
const sequelize = require('./config/db');
const app = express();
const path = require('path');
const port = 4050;
const { Candidates, Audit_log, Employees } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const emp_route = require('./routes/employee');
app.use('/', emp_route);

const cand_route = require('./routes/candidate');
app.use('/', cand_route);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/registerpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/register.html'));
});

app.get('/candidate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/candidates.html'));
});

app.get('/employees', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/employees.html'));
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('DB synced successfully.');

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
  });
