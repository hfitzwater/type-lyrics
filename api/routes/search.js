const express = require('express');
const router = express.Router();
const axios = require('axios');
const parse = require('node-html-parser').parse;

const ACCESS_TOKEN = `wbg0PB07I_wb-O3gH5QjgTmxK9LsE0JOVDyaUwBuaccKvFcmm7Jo8lmzpZErp-WY`;

router.get('/:query', function(req, res, next) {
  const query = req.params.query;

  const uri = `http://api.genius.com/search?q=${query}&access_token=${ACCESS_TOKEN}`;

  axios.get(uri)
  .then(response => {
    let songs = response.data.response.hits.filter(h => h.type === 'song');

    res.send({
      songs
    });
  });
});

module.exports = router;