/*
 * Gregor Thomson - 2029108
 *
 * Honours Project: tests for contact page
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').app;
var should = chai.should();

chai.use(chaiHttp);

describe('about', function() {

  /*
   * A GET /contact request should render the Contact page
   */
  it('should goto the contact page on /contact GET', function(done) {
    chai.request(server)
      .get('/contact')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  /*
   * GET /about should provide the about page
   */
  it('should show the contact page', function(done) {
    chai.request(server)
      .get('/contact')
      .end(function(err, res){
        res.body.should.be.a('object');
        res.text.should.contain('ontact Us');
        done();
      });
  });
});
