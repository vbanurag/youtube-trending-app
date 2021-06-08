const express = require('express');
const videoController = require('./videos.controller');

const router = express.Router();

router.post('/list', videoController.listVideos);
router.get('/details/:id', videoController.fetchVideoDetailsByID);

module.exports = router;