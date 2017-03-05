/*
 * autor: Gregor Thomson(2029108t)
 * University of Glasgow
 *
 * Finds the word2vec vector for each skillWord
 * returns: Map[skill: vector]
 */

'use strict';
var readline = require('readline');
var fs = require('fs');
var string = require('string');
var wordVecs = require('./data/wordvecs25000.js').wordVecs;
var stopWords = require('./data/words.js').stopWords;
var skill2vec = new Map();

// file reader --------------------------------------------------------------------
// read file, line by line (skill by skill)
var lineReader = readline.createInterface({
  input: fs.createReadStream('data/skills.txt')
});

// on skill read
lineReader.on('line', function (skill) {
  addToMap(skill);
});

// when done
lineReader.on('close', function() {
  var skills;
  var vec;
  var currentVec;
  console.log("skill, vector");
  // for each skill, get vector
  for (var skill of skill2vec.keys()) {
    vec = "[";
    currentVec = skill2vec.get(skill);
    if (currentVec !== null){
      for (var i = 0; i < currentVec.length - 1; i++){
        vec += currentVec[i] + "; ";
      }
      vec += currentVec[currentVec.length - 1];
    }
    vec += "]";
    console.log(skill + ", " + vec);
  }
});

// The glue --------------------------------------------------------------------
function addToMap(Originalskill){
  var Originalskill = Originalskill.replace(',','');
  var skillVector = [];
  var currentVec;
  var word;
  var matched = 0;  // number of words in skill matched

  // remove punctuation and split into words
  var skill = string(Originalskill).stripPunctuation().s;
  var skillWords = skill.split(/[ ,]+/);

  // init skill vector
  for (var x = 0; x < 300; x++){
    skillVector[x] = 0;
  }

  // for each word in skill
  for (var i = 0; i < skillWords.length; i++) {
    word = skillWords[i].toLowerCase();
    if (stopWords.indexOf(word) == -1){   // isn't a stop word
      // add to skill vector
      currentVec = wordVecs[word];
      if (currentVec !== undefined){
        matched++;
        for (var x = 0; x < currentVec.length; x++){
          skillVector[x] += currentVec[x];
        }
      }
    }
  }

  // get average vector score
  if (matched != 0){
    for (var x = 0; x < skillVector.length; x++){
      skillVector[x] = skillVector[x]/matched;
    }
  }
  else {  // no word in skill matched. Hence, no vector
    skillVector = null;
  }

  // add to map
  skill2vec.set(Originalskill, skillVector);

}
