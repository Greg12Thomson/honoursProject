var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').app;
var should = chai.should();

chai.use(chaiHttp);

describe('process', function() {

  /*
   * GET /process should fail as it is not a url
   */
  it('should fail on /process GET', function(done) {
    chai.request(server)
      .get('/process')
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });
});
