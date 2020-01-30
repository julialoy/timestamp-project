// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let dateString = req.params.date_string;
  let utcString = "";
  let unix = "";

  // Return a new Date object if date string is undefined or an empty string
  if (dateString === undefined) {
    dateString = new Date();
  } else if (dateString.length === 0) {
    dateString = new Date();
  }

  // Attempt to parse date string
  // Provide error if unable to parse
  if (dateString.indexOf('-') === -1) {
    try {
      dateString = new Date(parseInt(dateString) * 1000);
      utcString = dateString.toUTCString();
      unix = dateString.getTime();
    } catch {
      utcString = "Invalid Date";
      unix = null;
    }
  } else {
    try {
      dateString = new Date(dateString);
      utcString = dateString.toUTCString();
      unix = dateString.getTime();
    } catch {
      utcString = "Invalid Date";
      unix = null;
    }
  }

  // console.log(`DATE STRING: ${dateString}`);
  // console.log(`UTC STRING: ${utcString}`);
  // console.log(`UNIX: ${unix}`);

  // Make sure unix value is an integer or null
  if (unix !== null) {
    unix = parseInt(unix);
  }

  // Return json object
  res.json({unix: unix, utc: `${utcString}`});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});


