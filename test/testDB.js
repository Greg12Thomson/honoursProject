/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: tests for mongoDB
 */
var chai = require('chai'); //assertion library
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
  it('database should connect', function(done) {
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
   * tests skill collection connection
   */
  it('should be able to connect to skill collection', function(done) {
    this.timeout(15000);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log("Failed to connect to server: ", err)
        assert.isOk(false, 'Failed to connect to database');
      }
      else {
        console.log("Connected to DB");
        var collection = db.collection('skill');
        collection.find({}).toArray(function (err, result) {
          if (result){
            should.exist(result.length);
            done();
          }
          else {
            assert.isOk(false, 'Could not connect to skill collection');
          }
        });
      }
    });
  });

  /*
   * tests skill collection request
   */
  it('should find \'java\' in skill collection', function(done) {
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

  /*
   * tests skillVec collection connection
   */
  it('should be able to connect to skillVec collection', function(done) {
    this.timeout(15000);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log("Failed to connect to server: ", err)
        assert.isOk(false, 'Failed to connect to database');
      }
      else {
        console.log("Connected to DB");
        var collection = db.collection('skillVec');
        collection.find({}).toArray(function (err, result) {
          if (result){
            should.exist(result.length);
            done();
          }
          else {
            assert.isOk(false, 'Could not connect to skillVec collection');
          }
        });
      }
    });
  });

  /*
   * tests skillWiki collection connection
   */
  it('should be able to connect to skillWiki collection', function(done) {
    this.timeout(15000);
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log("Failed to connect to server: ", err)
        assert.isOk(false, 'Failed to connect to database');
      }
      else {
        console.log("Connected to DB");
        var collection = db.collection('skillWiki');
        collection.find({}).toArray(function (err, result) {
          if (result){
            should.exist(result.length);
            done();
          }
          else {
            assert.isOk(false, 'Could not connect to skillWiki collection');
          }
        });
      }
    });
  });

});
