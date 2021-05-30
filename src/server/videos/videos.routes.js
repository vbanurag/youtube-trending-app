const express = require('express');
const videoController = require('./videos.controller');

const router = express.Router();

router.post('/add', (req,res) => { });
router.get('/list', videoController.fetchAndSaveYoutubeVideos);

module.exports = router;