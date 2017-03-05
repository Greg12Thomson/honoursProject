/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: tests helper functions of word2vec.js
 */
var chai = require('chai'); //assertion library
var wordVecs = require('../data/wordvecs25000.js').wordVecs;
var getCosSim = require('../word2vec').getCosSim;
var mag = require('../word2vec').mag;

var should = chai.should();

/*
 * test getCosSim function
 */
// describe('getCosSim', function() {
//   var vec1 = wordVecs["java"];
//   var vec2 = wordVecs["technology"];
//
//   it('getCosSim should return something sensible', function(done) {
//     var val = getCosSim(vec1, vec2);
//     val.should.be.below(1);
//     val.should.be.above(0);
//     done();
//   });
//
// });

describe('mag', function() {
  var vec1 = wordVecs["java"];
  var vec2 = wordVecs["technology"];

  // magnitude should be equal to 1, roughly
  it('mag should return length of vector', function(done) {
    var val = mag(vec1);
    var val2 = mag(vec2);
    val.should.be.above(0.9);
    val.should.be.below(1.1);
    val2.should.be.above(0.9);
    val2.should.be.below(1.1);
    done();
  });

});
