const express = require('express');
const router = express.Router();
const axios = require('axios');
const parse = require('node-html-parser').parse;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Typing Practice' });
});

module.exports = router;
