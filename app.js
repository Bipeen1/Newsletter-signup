const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/8729bd54ca";
  const options = {
    method: "post",
    auth: "bipeen1:7df32c83f76b7cf3d2213de370b94dca-us7"
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT, function () {
  console.log("Server is started at 3000 port");
});

// apikey
// 7df32c83f76b7cf3d2213de370b94dca-us7

// unique id 
// 8729bd54ca


// you can visit this web site on server
// https://vast-retreat-09361.herokuapp.com/