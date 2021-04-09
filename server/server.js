const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session')

const app = express();
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(compression());
app.use(cors());

app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.set('port', (process.env.PORT || 8081));
app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
});
