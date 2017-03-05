var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

// https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{project}/{access}/{agent}/{article}/{granularity}/{start}/{end}

xhr.open("GET", "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/Location_API_for_Java_ME/monthly/20151231/20170101", false);
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


console.log("Views in 2016: ", views);
console.log("Average views per month: ", Number.parseInt(views/response.length));
console.log("Average views per day: ", Number.parseInt(views/365));
