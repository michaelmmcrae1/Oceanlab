var express = require('express')
  , logger = require('morgan')
  , app = express()
  , hometemplate = (__dirname + '/src/index.html')
  
app.use(logger('dev'))
app.use(express.static(__dirname + '/src'))

app.get('/', function (req, res, next) {
  try {
    var html = hometemplate({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
