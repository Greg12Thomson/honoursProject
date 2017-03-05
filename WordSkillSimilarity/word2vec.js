'use strict';
var readline = require('readline');
var fs = require('fs');
var string = require('string');

var wordVecs = require('./data/wordvecs25000.js').wordVecs;
var stopWords = require('./data/words.js').stopWords;
var skillWords = [];
var simWords = [];
var output = [];
var word2skills = new Map();
var word;
var score;
var skill;

// file reader --------------------------------------------------------------------
// read file, line by line (skill by skill)
var lineReader = readline.createInterface({
  // use test.txt for testing. skills.txt is the full file
  input: fs.createReadStream('data/test.txt')
});

// on skill read
lineReader.on('line', function (line) {
  addToMap(line);
});

// when done
lineReader.on('close', function() {
  var skills;
  console.log("word, skills")
  // for each word
  for (var word of word2skills.keys()) {
    skills = "[";
    // for each skill
    for (var skill of word2skills.get(word).keys()) {
      // (skill, score),
      skills += "(" + skill + ";" + word2skills.get(word).get(skill) + "); ";
    }
    skills = skills.substring(0, skills.length - 2);
    skills += "]";
    console.log(word + ", " + skills);
  }
});

// The glue --------------------------------------------------------------------
function addToMap(Originalskill){
  //remove ,
  Originalskill = Originalskill.replace(',','');
  var i = 0;
  var simWords = [];
  // remove punctuation and split into words
  skill = string(Originalskill).stripPunctuation().s;
  skillWords = skill.split(/[ ,]+/);
  // for each word in skill
  for (i = 0; i < skillWords.length; i++) {
    word = skillWords[i].toLowerCase();
    if (stopWords.indexOf(word) == -1){   // isn't a stop word
      output = findSimilarWords(10, word);
      if (output[0] !== false){           // if found
        simWords = simWords.concat(output);
      }
    }
  }

  // if no matches set bag to [skill, 1]
  if (simWords.length == 0){
    simWords.push([Originalskill.toLowerCase(), 3.0]);
  }
  // skill more than one word
  if (skillWords.length > 1) {
    simWords.push([Originalskill.toLowerCase(), 3.0]);
  }
  // loop through similar words
  for (var i = 0; i < simWords.length; i++) {
    word = simWords[i][0];
    score = simWords[i][1]
    // if first instance of word
    if (word2skills.get(word) === undefined){
      word2skills.set(word, new Map());
    }
    // add <Word,<Skill, Score> >
    word2skills.set(word, word2skills.get(word).set(Originalskill, score));

    // if word matches skill, set score to 3
    if (word === Originalskill.toLowerCase()){
      word2skills.set(word, word2skills.get(word).set(Originalskill, 1.0));
    }
  }
}

// word2vec --------------------------------------------------------------------
function findSimilarWords(n, word) {
  if (!wordVecs.hasOwnProperty(word)) {
    return [false, word];
  }

  return getNClosestMatches(n, wordVecs[word]);
}

function getNClosestMatches(n, vec) {
  var sims = [];
  for (var word in wordVecs) {
    var sim = getCosSim(vec, wordVecs[word]);
    sims.push([word, sim]);
  }
  sims.sort(function(a, b) {
    return b[1] - a[1];
  });
  return sims.slice(0, n);
}

// helper functions ------------------------------------------------------------
function getCosSim(f1, f2) {
  return Math.abs(f1.reduce(function(sum, a, idx) {
    return sum + a*f2[idx];
  }, 0)/(mag(f1)*mag(f2))); //magnitude is 1 for all feature vectors
}

function mag(a) {
  return Math.sqrt(a.reduce(function(sum, val) {
    return sum + val*val;
  }, 0));
}

module.exports = {"lineReader": lineReader,
                  "addToMap": addToMap,
                  "findSimilarWords": findSimilarWords,
                  "getNClosestMatches": getNClosestMatches,
                  "getCosSim": getCosSim,
                  "mag": mag
                  };
