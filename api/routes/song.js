const express = require('express');
const router = express.Router();
const axios = require('axios');
const parse = require('node-html-parser').parse;

const ACCESS_TOKEN = process.env.CLIENT_TOKEN;

router.get('/:songId', function(req, res, next) {
  const songId = req.params.songId;
  const uri = `http://api.genius.com/songs/${songId}?access_token=${ACCESS_TOKEN}`;
      
  axios.get(uri)
    .then(response => {
      const songUri = response.data.response.song.url;

      return axios.get(`${songUri}`);
    })
    .then(response => {
      const html = response.data;
      const root = parse(html);

      const lyric = root.querySelector('.lyrics').text;
      
      const lines = lyric.split('\n').filter(line => {
        line = line.trim();
        if( line.startsWith('[') ) {
          return false;
        }

        if( line.length === 0 ) {
          return false;
        }

        return true;
      });

      res.send({
        lines
      });
    });
});

module.exports = router;