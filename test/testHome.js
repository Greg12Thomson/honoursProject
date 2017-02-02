var chai = require('chai'); //assertion library
var chaiHttp = require('chai-http');
var server = require('../index').app;
var should = chai.should();

chai.use(chaiHttp);

describe('home', function() {

  /*
   * A GET / request should render the home page
   */
  it('should goto home page on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  /*
   * GET / should give the user access to all 4 algorithms
   */
  it('should show four algorithms', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.body.should.be.a('object');
        res.text.should.contain('Algorithm 1');
        res.text.should.contain('Algorithm 2');
        res.text.should.contain('Algorithm 3');
        res.text.should.contain('Algorithm 4');
        done();
      });
  });

  /*
   * GET /junk should fail as it is not a url
   */
  it('should fail on /junk GET', function(done) {
    chai.request(server)
      .get('/junk')
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });

});
