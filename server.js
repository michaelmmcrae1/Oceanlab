var express = require('express');
var app     = express()
  , logger = require('morgan')
  , app = express()
  , path = require('path')
  , router = express.Router()
  
//app.use(logger('dev'))
//app.set('views', __dirname + '/static')
app.use(express.static(__dirname + '/static'));
//app.use(router);
//app.set('view engine', 'jade');

// sample route with a route the way we're used to seeing it
app.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('static/index.html');  
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});

// apply the routes to our application
app.use('/', router);

app.listen(process.env.PORT || 5455, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 5455))
})
