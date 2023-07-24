
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Video = require('../models/Video');

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).send('No video file selected.');
    }

    const { originalname, mimetype, filename, path } = req.file;
    const video = new Video({
      title: req.body.title,
      filename,
      originalname,
      mimetype,
      path,
    });
    await video.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error uploading video.');
  }
});

// Video playback route
router.get('/play/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.render('video_player', { video });
  } catch (err) {
    res.status(404).send('Video not found.');
  }
});

// Root route
router.get('/', (req, res) => {
  res.render('upload_form');
});

module.exports = router;
