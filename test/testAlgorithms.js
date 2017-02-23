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
  var skillMap;
  var skills;

  before(function() {
    skillMap = new Map();
    skills = ['java', 'C++', 'software engineering'];
    skillMap.set(skills[0], 0.8);
    skillMap.set(skills[1], 0.9);
    skillMap.set(skills[2], 0.7);
  });

  /*
   * generateScore returns something sensible
   */
  it('generateScore should return score between 0 and 1', function(done) {
    var score = generateScore(skillMap, skills[0]);
    expect(score).to.be.below(1);
    expect(score).to.be.above(0);
    done();
  });

  /*
   * generateScore returns null if not a skill
   */
  it('generateScore should return null if skill not found', function(done) {
    var score = generateScore(skillMap, 'python');
    expect(score).to.be.a('null');
    done();
  });

});

describe('generateSkillMap', function() {
  var skills = ['java', '0.98', 'C++', '0.88', 'software engineering', '0.75'];

  /*
   * generateSkillMap returns something sensible
   */
  it('generateSkillMap should be <skill, score> for all skills', function(done) {
    this.timeout(15000);

    var skillMap = generateSkillMap(skills);
    var keys = Array.from(skillMap.keys());

    for (var i = 0; i < skills.length; i++){
      expect(keys).to.include(skills[i]);
      expect(skillMap.get(skills[i])).to.equal(parseFloat(skills[++i]));
    }

    done();

  });


  /*
   * generateSkillMap score be normalized and not string
   */
  it('generateSkillMap scores should be between 0 and 1', function(done) {
    this.timeout(15000);

    var skillMap = generateSkillMap(skills);
    var values = Array.from(skillMap.values());

    for (var i = 0; i < values.length; i++){
      expect(values[i]).to.be.below(1);
      expect(values[i]).to.be.above(0);
      expect(values[i]).is.not.a('string');
    }

    done();

  });


  /*
   * generateSkillMap should return empty Map if not skills passed
   */
  it('generateSkillMap should return {} if no skills passed in', function(done) {
    this.timeout(15000);

    var skillMap = generateSkillMap([]);
    var keys = Array.from(skillMap.keys());

    expect(keys).to.have.length(0);

    done();

  });


});
