const express = require('express');
const mustache = require('mustache-express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'magic',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(request, response) {
  response.render('index')
})
var usersession


app.post('/login', function(request, response) {

if(request.body.username=='syed' && request.body.password=='donuts'){

  if(!request.session.username){
    usersession = request.session.user = {}
  }

usersession.username=request.body.username
response.render('loggedOut')
}
else{
  response.render('index')
}
});

app.post('/comeback', function(request, response) {
  //if user clicks the 'ready to leave' button, destroy their session then redirect user to main login page
  request.session.destroy()
  response.render('index')

});

app.listen(3000, function() {
  console.log("Ready set go!")
});
