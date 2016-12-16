/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: test sight
 */


// server init
var express = require('express');
var app = express();
var async = require('async');


app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded({
  extended: true
}));

app.set('port', process.env.PORT || 3000);

// set static to /public
app.use(express.static(__dirname + '/public'));

// -----------------------------------------------------------------------------
// database init -
var MongoClient = require('mongodb').MongoClient;
var string = require('string');
var url = 'mongodb://localhost:27017/honoursProject';


// -----------------------------------------------------------------------------
// base directory
app.get('/', function(req, res){
  res.render('home');
});

app.post('/process', function(req, res){
  var description = req.body.description;
  var skills = [];
  var words = new Set();
  var skillList = [];
  var skillMap = new Map();

  // replace punctuation with space
  var jobDescription = description.replace(/['";:,.\/?\\-]/g, ' ');
  // strip the rest of the punctuation
  jobDescription = string(jobDescription).stripPunctuation().s;
  // split on space
  jobDescription = jobDescription.split(" ");

  // Connect to the db
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log("Failed to connect to server: ", err)
    }
    else {
      console.log("Connected to DB");
      var collection = db.collection('skills');

      async.eachSeries(jobDescription,function(w, callback) {
        w = w.toLowerCase();
        collection.findOne({word: w}, function(err, result) {
          if (result){
            // add to matched words
            words.add(w);
            // add to skills
            result.skills.split(";").forEach(function(s){
              s = s.replace(/[\[\]{()}]/g, '');
              skills.push(s.trim());
            });

          }
          callback(err);
        });
      },function(err) {
          if (err){
            console.log("Error: ", err);
          }
          else {
            var i = 0;
            skillList = [];
            // make map of skills with scores
            while (i < skills.length){
              if (skillMap.get(skills[i])) {
                skillMap.set(skills[i], skillMap.get(skills[i]) + parseFloat(skills[i+1]));
              }
              else {
                skillMap.set(skills[i],parseFloat(skills[i+1]));
              }
              i += 2;
            }
            // create return list
            for (var key of skillMap.keys()) {
              skillList.push({skill: key,
                              score: skillMap.get(key)
                            });
            }

            // get top ten skills
            var score = [];
            var topTen = [];
            skillList.forEach(function(skill) {
              score.push(skill.score);
            });

            var max = score[0];
            var maxIndex = 0;
            for (var i = 0; i < 10 && i < score.length; i ++){
              for (var j = 1; j < score.length; j++) {
                  if (score[j] > max) {
                      maxIndex = j;
                      max = score[j];
                  }
              }
              topTen.push(skillList[maxIndex]);
              // set score to min
              score[maxIndex] = -1;
              max = score[0];
              maxIndex = 0;
            }

            //TODO fix textbox highlight to only show words
            words.delete("c");
            words = Array.from(words).sort();

            res.render('overview',{
              "skills" : topTen,
              "words" : words,
              "description" : description
            });
          }
      });
    }
  });
});


app.use(function(req, res, next){
  console.log("Looking for URL " + req.url);
  next();
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/overview', function(req, res){
  res.render('overview');
});


// show data
app.get('/getData', function(req, res,next){
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
