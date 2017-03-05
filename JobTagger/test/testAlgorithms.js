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
var stripStopWords = require('../index').stripStopWords;
var getTopScores = require('../index').getTopScores;


var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;


chai.use(chaiHttp);

/*
 * Test generateScore method
 */
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

/*
 * Test generateSkillMap method
 */
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

/*
 * Test stripStopWords method
 */
describe('stripStopWords', function() {

  /*
   * stripStopWords should remove
   */
  it('stripStopWords should remove stop words from string', function(done) {
    var words = "remove stop words from this string".split(" ");
    var nonSplitWords = stripStopWords(words);


    nonSplitWords.should.have.length(2);
    nonSplitWords.should.contain('remove');
    nonSplitWords.should.contain('string');
    done();

  });

  /*
   * stripStopWords should remove all stop words
   */
  it('stripStopWords should return empty array if passed stop words', function(done) {
    var words = "a be the than but".split(" ");
    var nonSplitWords = stripStopWords(words);


    nonSplitWords.should.be.empty;
    done();

  });

});

/*
 * getTopScores
 */
describe('getTopScores', function() {
  skillList = []
  skills = ["java", "C++", "software engineering", "managment", "problem solving", "object oriented programming"]
  scores = [0.91, 0.9, 0.7, 0.2, 0.852, 0.82]

  /*
   * Runs before all tests in this block.
   * Generate skill list to be sorted
   */
  before(function() {
    for (var i = 0; i < skills.length; i++){
      skillList.push({skill: skills[i],
                      skill_id: i,
                      score: scores[i],
                      words: []
                    });
    }
  });


  /*
   * getTopScores should get top n skills
   */
  it('getTopScores should only return n skills', function(done) {
    var n = 5;
    var newSkillList = getTopScores(skillList, n);
    newSkillList.should.have.length(n);
    done();
  });


  it('getTopScores should only return highest scoring n skills', function(done) {
    var n = 5;
    var newSkillList = getTopScores(skillList, n);
    var skills = []
    for (var i = 0; i < newSkillList.length; i++){
      skills.push(newSkillList[i].skill);
    }
    newSkillList.should.have.length(n);
    // should remove management as it is the lowest scoring skill
    skills.should.contain("java");
    skills.should.contain( "C++");
    skills.should.contain("software engineering");
    skills.should.contain("problem solving");
    skills.should.contain("object oriented programming");
    skills.should.not.contain("managment");
    done();
  });


  it('getTopScores should return empty list if n is 0', function(done) {
    var newSkillList = getTopScores(skillList, 0);
    newSkillList.should.have.length(0);
    done();
  });

});
