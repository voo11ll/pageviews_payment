const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.render('index'));



router.get('/set', ensureAuthenticated, (req, res) =>
  res.render('./EditProfilePage.html', {
    user: req.user
  })
);

module.exports = router;  