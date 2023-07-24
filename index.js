
// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;

//  MongoDB
// mongoose.connect('mongodb://localhost/video_playback_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// multer for handling video uploads
// const upload = multer({ dest: 'uploads/' });

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set('view engine', 'ejs');


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path'); // Add this line to import the 'path' module

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/video_playback_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');


// Including video routes
const videoRoutes = require('./routes/videos');
app.use('/', videoRoutes);

// starting the server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
