var express = require('express');
var app     = express(),
  logger = require('morgan'),
  path = require('path'),
  router = express.Router(),
  fs = require('fs');
  
//app.use(logger('dev'))
//app.set('views', __dirname + '/static')
app.use(express.static('static'));
//app.use(router);
//app.set('view engine', 'jade');a

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(logger('combined', {stream: accessLogStream}));

// setup basic sendfile options
var opts = {
    root: __dirname
};

app.get('/', function(req, res) {
    res.sendFile('pages/index.html', opts);
});

app.get('/about.html', function(req, res) {
    res.sendFile('pages/about.html', opts); 
});

app.get('/students.html', function(req, res) {
    res.sendFile('pages/students.html', opts); 
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 8080));
});
