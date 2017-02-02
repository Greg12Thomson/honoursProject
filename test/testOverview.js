var chai = require('chai'); //assertion library
var chaiHttp = require('chai-http');
var httpMocks = require('node-mocks-http');
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

  // /*
  //  * GET /process should fail as it is not a url
  //  */
  // it('should fail on /process GET', function(done) {
  //   var req  = httpMocks.createRequest({
  //       method: 'POST',
  //       url: '/process',
  //       body: {
  //         description: "description"
  //       }
  //   });
  //
  //   var res = httpMocks.createResponse();
  //
  //   process1(req, res);
  //
  //   var data = JSON.parse( res._getData() );
  //   res.should.have.status(200);
  //   done();
  // });

});
