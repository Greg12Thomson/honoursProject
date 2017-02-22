/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: tests for home page
 */
var chai = require('chai'); //assertion library
var chaiHttp = require('chai-http');
var server = require('../index').app;
var generateSkillMap = require('../index').generateSkillMap;
var generateScore = require('../index').generateScore;


var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;


chai.use(chaiHttp);

describe('generateScore', function() {

  /*
   * generateScore returns something sensible
   */
  it('generateScore should return score between 0 and 1', function(done) {
    var skillMap = new Map();
    var skills = ['java', 'C++', 'software engineering'];
    skillMap.set(skills[0], 0.8);
    skillMap.set(skills[1], 0.9);
    skillMap.set(skills[2], 0.7);

    var score = generateScore(skillMap, 'java');
    expect(score).to.be.below(1);
    expect(score).to.be.above(0);
    done();
  });

  /*
   * generateScore returns something sensible
   */
  it('generateScore should return null if skill not found', function(done) {
    var skillMap = new Map();
    var skills = ['java', 'C++', 'software engineering'];
    skillMap.set(skills[0], 0.8);
    skillMap.set(skills[1], 0.9);
    skillMap.set(skills[2], 0.7);

    var score = generateScore(skillMap, 'python');
    expect(score).to.be.a('null');
    done();
  });

});

// describe('generateSkillMap', function() {
//   var skillMap;
//   var skills;
//
//   before(function() {
//     skills = ["java", "0.99", "C++", "0.8", "software engineering", "0.75"]
//     skillMap = generateSkillMap(skills, function() { done(); });
//   });
//
//   /*
//    * generateScore returns something sensible
//    */
//   it('generateSkillMap should return a Map', function(done) {
//     this.timeout(5000);
//     // skills = ["java", "0.99", "C++", "0.8", "software engineering", "0.75"]
//     // var promise = new Promise(function(resolve, reject){
//     //   // add promise
//     //   skillMap = generateSkillMap(skills, function(err, res) {
//     //     if (err){
//     //       return done(err);
//     //     }
//     //     else{
//     //       resolve(res);
//     //     }
//     //   });
//     // });
//     //
//     // promise.then(function(map) {
//     //   map.should.have.length(3);
//     //   expect(map).to.have.any.keys('java', 'C++', 'software engineering');
//     //   done();
//     // });
//     expect(skillMap).to.have.any.keys('java', 'C++', 'software engineering');
//     done();
//
//
//
//   });

// });
