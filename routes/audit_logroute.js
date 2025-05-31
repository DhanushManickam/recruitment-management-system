const express = require('express');
const Candidate = require('../models/candidatemodel');
const AuditLog = require('../models/audit_logs_model'); 

const cand_route = express.Router();

cand_route.put('/', async (req, res) => {


  try {
    

    res.status(200).json({ message: 'updated '});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error in updattion', details: err });
  }
});

module.exports = cand_route;
