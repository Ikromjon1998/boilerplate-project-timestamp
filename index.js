// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// This defines the first API endpoint for the application.
// It listens for GET requests to the /api/:date route, where :date is an optional parameter.
app.get("/api/:date?", function(req, res) {

  // Get the value of the :date parameter from the request object.
  let dateStr = req.params.date;

  // Declare a variable for the date object.
  let date;

  // If no :date parameter is provided, use the current date and time.
  if (!dateStr) {
    date = new Date();
  } else {
    // If the :date parameter is a Unix timestamp, convert it to a Date object.
    if (/^\d+$/.test(dateStr)) {
      date = new Date(parseInt(dateStr));
    } else {
      // If the :date parameter is a date string, attempt to parse it.
      date = new Date(dateStr);
    }

    // Check if the date object is invalid.
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  // Return the Unix timestamp (in milliseconds) and UTC date string as a JSON object.
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
