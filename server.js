// require components
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
require("dotenv").config();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());


// connect to MongoDB
const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGODB_URI;

console.log(url);

const client = new MongoClient(url);
client.connect();



// begin section for nodemailer

// test that our environment variables are working
console.log("process.env.EMAIL_USER = " + process.env.EMAIL_USER);
console.log("process.env.EMAIL_PASS = " + process.env.EMAIL_PASS);



var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

var mailConfigurations = {
    from: process.env.EMAIL_USER,
    to: "",
    subject: "ZenGrid Sudoku email verification",
    text: ""
};



// temporary testing: just send the email whenever we start up the server.
/*
transporter.sendMail(mailConfigurations, function(error, info) {
    if (error)
    {
        console.log("Error!" + error);
    }
    console.log("Email sent successfully");
    console.log(info);
});
*/





// begin section for APIs
app.post("/api/createuser", async (req, res, next) => {
  var error = "";

  const { username, email, password } = req.body;

  // try to push newuser to Users collection
  try {
    const db = client.db("Sudoku");

    // NEW: added verified field, which stores a boolean value.
    // 'verified' will be false at the start, changes when user verifies the account.
    const newUser = { Username: username, Email: email, Password: password, Verified: false };

    const result = await db.collection("Users").insertOne(newUser);

    // return insertedId (or _id) from DB and code 200 if successful

    
    var ret = { username: username, id: result.insertedId };


    console.log("\n\nAttempting to send email:");


    // EMAIL VERIFICATION:
    // send out the email verification here to the specified user on successful account create
    
    // create a JSON web token to send to the user
    const payload = {
        userId: ret.id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h" // give user 24 hours to verify
    });
  
  
    // change the email data to send to the user's entered email address
    mailConfigurations.to = email;
    mailConfigurations.text = "Thank you for registering for ZenGrid Sudoku!" +
                              "Please click the following link to verify your account:\n " +
                              "http://localhost/verificationpage?token=${token}";

    await transporter.sendMail(mailConfigurations, function(error, info) {
        if (error) console.log(error);
        else 
        {
            console.log("Email sent!");
            console.log(info);
        }
    });






    res.status(200).json(ret);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
});



// NEW: called from verification page. Verifies user which clicked on the link.
app.post("/api/verifyUser", async( req, res, next) => {
    const token = req.query.token;

    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find the user by decoded.userId
        const db = client.db("Sudoku");

        const result = await db
            .collection("Users")
            .find({ _id: decoded.userId });

        console.log("Found user ID:");
        console.log(result._id);


        // if the user is found and they are not verified, update their verification status
        if (result.verified === false)
        {
            db.collection("Users").updateOne(
                { _id: result._id },
                { $set: { verified: true } }
            );
        }
        else
        {
            console.log("User already verified!");
        }
    }
    catch (e)
    {
        console.log("Error:");
        console.log(e);
    }

});






app.post("/api/login", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  var error = "";
  const { email, password } = req.body;
  var code;

  try {
    const db = client.db("Sudoku");
    const results = await db
      .collection("Users")
      .find({ Email: email, Password: password })
      .toArray();

    // check if results is empty, throw error for user not found with code 501
    if (results.length == 0) {
      code = 501;
      throw new Error("Invalid email/password");
    }

    // if login succeeds and user with login/passwrord is found, return the _id, username of user
    var id = results[0]._id;
    var username = results[0].Username;

    // return id, firstname, and lastname if successful
    var ret = { id: id, Username: username };
    res.status(200).json(ret);
  } catch (e) {
    error = e.toString();

    if (code != 501) code = 500;
    var ret = { message: error };
    res.status(code).json(ret);
  }
});

// gets specific number puzzle from the easy set
app.post("/api/getpuzzle_devtest", async (req, res, next) => {
  var error = "";
  const { puzzlenumber } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzlenumber.length === 0) {
    var ret = {
      message: "Error, no puzzle number given in getpuzzle_devtest.",
    };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("devtestpuzzle")
        .find({ puzzle_number: puzzlenumber })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) throw new Error("Devtest puzzle not found");

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
  }
});

// gets specific number puzzle from the easy set
app.post("/api/getpuzzle_easy", async (req, res, next) => {
  var error = "";
  const { puzzlenumber } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzlenumber.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_easy." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_easy")
        .find({ puzzle_number: puzzlenumber })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) throw new Error("Easy puzzle not found");

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
  }
});

// gets specific number puzzle from the medium set
app.post("/api/getpuzzle_medium", async (req, res, next) => {
  var error = "";
  const { puzzlenumber } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzlenumber.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_medium." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_medium")
        .find({ puzzle_number: puzzlenumber })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) throw new Error("Medium puzzle not found");

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
  }
});

// gets specific number puzzle from the hard set
app.post("/api/getpuzzle_hard", async (req, res, next) => {
  var error = "";
  const { puzzlenumber } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzlenumber.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_hard." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_hard")
        .find({ puzzle_number: puzzlenumber })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) throw new Error("Hard puzzle not found");

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
  }
});

app.post("/api/leaderboard", async (req, res, next) => {
  var error = "";

  const { level } = req.body;

  let result, query, options;
  result = null;
  query = null;
  options = null;

  //Seperates the category based on levels
  //Selects time greater than 0  in ascending order
  try {
    const db = client.db("Sudoku");

    if (level == "easy") {
      query = { Time_Easy: { $gt: 0 } };
      options = {
        projection: { _id: 0, Time_Easy: 1, Login: 1 },
        sort: { Time_Easy: 1 },
      };

    } else if (level == "medium") {
        query = { Time_Medium: { $gt: 0 } };
        options = {
          projection: { _id: 0, Time_Medium: 1, Login: 1 },
          sort: { Time_Medium: 1 },
        };
    } else {
        query = { Time_Hard: { $gt: 0 } };
        options = {
          projection: { _id: 0, Time_Hard: 1, Login: 1 },
          sort: { Time_Hard: 1 },
        };
    }
    
    result = await db.collection("Users").find(query, options).toArray();

    JSON.stringify(result);
    var ret = { leaderboard: result };

    res.status(200).json(ret);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
});






// these were demo APIs from the MERN lab document. deleting in the future
/*
app.post("/api/addcard", async (req, res, next) => {
  // incoming: userId, card
  // outgoing: error

  const { userId, card } = req.body;

  const newCard = { Card: card, UserId: userId };
  var error = "";

  try {
    const db = client.db("Sudoku");
    const result = db.collection("cards").insertOne(newCard);
  } catch (e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/searchcards", async (req, res, next) => {
  // incoming: userId, search
  // outgoing: results[], error
  var error = "";

  const { userId, search } = req.body;

  var _search = search.trim();

  const db = client.db("Sudoku");
  const results = await db
    .collection("cards")
    .find({ Card: { $regex: _search + ".*", $options: "i" } })
    .toArray();

  var _ret = [];
  for (var i = 0; i < results.length; i++) {
    _ret.push(results[i].Card);
  }

  var ret = { results: _ret, error: error };
  res.status(200).json(ret);
});
*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// app.listen(5000); // start Node + Express server on port 5000

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
