var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var readline = require('readline');
var fs = require('fs');
var response;
var views;

var lineReader = readline.createInterface({
  input: fs.createReadStream('data/skills_wiki.csv')
});

// on skill read
lineReader.on('line', function (line) {
  line = line.split(",");
  if (line[1] != "wiki_page"){
    // https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{project}/{access}/{agent}/{article}/{granularity}/{start}/{end}
    xhr.open("GET", "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" + line[1] + "/monthly/20151231/20170101", false);
    xhr.send();

    var response = xhr.responseText;
    if (response != ""){
      response = JSON.parse(response).items;
      var views = 0;
      for (var i = 0; i < response.length; i++){
        views += response[i].views
      }
    }
    else {
      var views = 0;
    }

    console.log(line[0].toLowerCase() + ", " + line[1] + ", " +  Number.parseInt(views/365));
  }
  else {
    console.log("skill, wiki_page, average_views");
  }

});
