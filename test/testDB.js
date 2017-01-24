var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').app;
var MongoClient = require('../index').MongoClient;
const url = 'mongodb://localhost:27017/honoursProject';
const should = chai.should();
const assert = require('assert');

chai.use(chaiHttp);

describe('Database', function() {

  /*
   * tests for connection to db
   */
  it('"database should connect', function(done) {
    this.timeout(15000);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log("Failed to connect to server: ", err)
        assert.isOk(false, 'Failed to connect to database');
      }
      else {
        console.log("Connected to DB");
        done();
      }
    });

  });

  /*
   * tests skill collection
   */
  it('"should find \'java\' in skill collection', function(done) {
    this.timeout(15000);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log("Failed to connect to server: ", err)
        assert.isOk(false, 'Failed to connect to database');
      }
      else {
        console.log("Connected to DB");
        var collection = db.collection('skills');
        collection.findOne({word: "java"}, function(err, result) {
          if (result){
            should.exist(result.skills);
            done();
          }
          else {
            assert.isOk(false, 'Could not find \'java\' in skill collection');
          }
        });
      }
    });

  });


});
