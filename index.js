var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// More imports here
app.set('port', process.env.PORT || 3000);

// set static to /public
app.use(express.static(__dirname + '/public'));

// -----------------------------------------------------------------------------
// base directory
app.get('/', function(req, res){
  res.render('home');
});

app.use(function(req, res, next){
  console.log("Looking for URL " + req.url);
  next();
});

//app.use(function(err, req, res, next){
//  console.log('Error: ' + err.message);
//  next();
//})

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});


// show data
app.get('/getData', function(req, res,next){
  var url = "mongodb://localhost:27017/honoursProject"
  // Connect to the db
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log("Failed to connect to server: ", err)
    }
    else {
      console.log("Connected to DB");
      var collection = db.collection('skills');
      collection.find({}).toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result.length) {
          res.render('data',{
            // Pass the returned database documents
            "skills" : result
          });
        } else {
          res.send('No documents found');
        }
        //Close connection
        db.close();
      });
    }
  });
});

//TODO app.post for submit button
// var description = req.body.desription; <- get job description

app.use(function(req, res){
  res.type('text/html');
  res.status('404');
  res.render('404');
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


// -----------------------------------------------------------------------------
app.listen(app.get('port'), function(){
    console.log('Express started press Ctrl-C to terminate')
});
