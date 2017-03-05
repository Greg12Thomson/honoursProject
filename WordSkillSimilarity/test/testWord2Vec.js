/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: tests word2vec functions of word2vec.js
 */
var chai = require('chai'); //assertion library
var wordVecs = require('../data/wordvecs25000.js').wordVecs;
var findSimilarWords = require('../word2vec').findSimilarWords;
var getNClosestMatches = require('../word2vec').getNClosestMatches;

var should = chai.should();


/*
 * test findSimilarWords function
 */
describe('findSimilarWords', function() {

  it('findSimilarWords should return n number of similar words', function(done) {
    var words = findSimilarWords(5, "java");

    words.should.have.length(5);
    done();
  });

  it('findSimilarWords should return empty array if n is 0', function(done) {
    var words = findSimilarWords(0, "java");

    words.should.have.length(0);
    done();
  });

  it('findSimilarWords should return array is order of similarity', function(done) {
    var words = findSimilarWords(5, "java");

    var max = words[0][1];
    for (var i = 1; i < words.length; i ++){
      max.should.be.above(words[i][1])
    }
    done();
  });

});

/*
 * test findSimilarWords function
 */
describe('getNClosestMatches', function() {
  var vec = wordVecs["java"];

  it('getNClosestMatches should return n number of similar words', function(done) {
    var words = getNClosestMatches(5, vec);

    words.should.have.length(5);
    done();
  });

  it('getNClosestMatches should return empty array if n is 0', function(done) {
    var words = getNClosestMatches(0, vec);

    words.should.have.length(0);
    done();
  });

  it('getNClosestMatches should return array is order of similarity', function(done) {
    var words = getNClosestMatches(5, vec);

    var max = words[0][1];
    for (var i = 1; i < words.length; i ++){
      max.should.be.above(words[i][1])
    }
    done();
  });

});
