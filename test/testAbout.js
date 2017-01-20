var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('about', function() {

  /*
   * A GET /about request should render the about page
   */
  it('should goto the about page on /about GET', function(done) {
    chai.request(server)
      .get('/about')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  /*
   * GET /about should provide the about page
   */
  it('should show the about page', function(done) {
    chai.request(server)
      .get('/about')
      .end(function(err, res){
        res.body.should.be.a('object');
        res.text.should.contain('About');
        done();
      });
  });
});
