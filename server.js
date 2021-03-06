// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string",function(req,res){
  let dateString = req.params.date_string;
  if (dateString.length>10) {
    dateString = parseInt(dateString)
  }
  var date = new Date(dateString);
  // res.send(today)
  // console.log(today.toLocaleDateString());
  if(date.toUTCString()=="Invalid Date"){
    res.json({"error":date.toUTCString()});
  }
  res.json({"unix":date.getTime(), "utc":date.toUTCString() });

})

///
// your Second API endpoint... 

app.get("/api/whoami",function(req,res){
  console.log(req.headers);
  let lang = req.headers["accept-language"];
  let sys = req.headers["user-agent"];
  let ip = req.headers["x-forwarded-for"].split(",");
  // console.log(ip)
  res.json({
    ipaddress:ip[0],
    language:lang,
    software:sys 
  })
})





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
