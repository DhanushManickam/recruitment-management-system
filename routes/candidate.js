const express = require('express');
const candidates = require('../models/candidate');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authentication = require('../middlewares/auth');
const {add_candidate, candidate_list, get_candidate,get_update_candidate, edit_canididate, put_update_candidate, delete_candidate} = require('../controllers/candidate');

const storage = multer.diskStorage({
  destination : (req, file, cb)=>{
    cb(null, path.join(__dirname,'../uploads'));
  },
  filename : (req, file, cb)=>{
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
})

const upload = multer({
 storage : storage,
 fileFilter : (req, file, cb)=>{
  if (file.mimetype === 'application/pdf') {
      cb(null, true);
  } else {
      cb(new Error('Only PDF files are allowed!'));
  }
 }
})

router.post('/add_candidate',upload.single('resume'), authentication, add_candidate);

router.get('/api/candidates', candidate_list);

router.get('/api/candidates/:id', get_candidate);

router.put('/api/candidates/:id', upload.single('resume'),authentication, edit_canididate);

router.get('/api/update-candidate/:id', get_update_candidate);

router.put('/api/update-candidate/:id',authentication,  put_update_candidate);

router.delete('/api/delete-candidate/:id',authentication, delete_candidate);
module.exports = router;