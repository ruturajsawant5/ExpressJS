var request = require('request');
console.log("Sunset is San Diego is .....");
request('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(error,response,body){
    if(!error&&response.statusCode==200){
        var parsedData=JSON.parse(body);
        console.log(parsedData["query"]["results"]["channel"]["item"]["condition"]["date"]);
    }
});