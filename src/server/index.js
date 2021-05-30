const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const videoRouter  = require('./videos/videos.routes');

const app = express();
const MONGO_URL = 'mongodb+srv://test:_testUser@cluster0.dhzqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log)
    .catch(console.log);  

app.use(express.static('dist'));
app.use('/api/v1/videos', videoRouter);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
