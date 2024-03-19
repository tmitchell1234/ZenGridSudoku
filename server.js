const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
const url = process.env.MONGODB_URI;

console.log(url);

const client = new MongoClient(url);
client.connect();

app.post("/api/createuser", async (req, res, next) => {
  var error = "";

  const { username, email, password } = req.body;

  const newUser = { Username: username, Email: email, Password: password };
  // try to push newuser to Users collection
  try {
    const db = client.db("Sudoku");
    const result = await db.collection("Users").insertOne(newUser);

    // return insertedId (or _id) from DB and code 200 if successful
    var ret = { username: username, id: result.insertedId };

    res.status(200).json(ret);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
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

// gets user time of the specific puzzle from the easy set
app.post("/api/getusertime_easy", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number } = req.body;
  
    try {
      const db = client.db("Sudoku");

      const results = await db
      .collection("user_times_easy")
      .find({ Username: username, Puzzle_number: puzzle_number})
      .toArray()

      // check if results is empty, throw error for invalid user/puzzle number with code 501
      if (results.length == 0) {
          code = 501;
          throw new Error("Invalid username/puzzle_number");
      }

      // otherwise if we find the valid combo of username and puzzle number, return it's usertime
      var time_easy = results[0].Time_easy;

      var ret = { time_easy: time_easy };
      res.status(200).json(ret);
    } catch (e) {
    // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
});

// sets user time of the specific puzzle from the easy set
app.post("/api/setusertime_easy", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number, time_easy } = req.body;

    if (puzzle_number < 1 || puzzle_number > 50) {
      var ret = { message: "Error, invalid easy puzzle number." };
      res.status(500).json(ret);
    } else {
      // check if string is empty. if it is, send error in return.
      try {
          const db = client.db("Sudoku");

          const results = await db
          .collection("user_times_easy")
          .find({ Username: username, Puzzle_number: puzzle_number})
          .toArray();

          // check if results is empty, create usertime for that specific puzzle
          if (results.length == 0) {
              const new_user_time = { Username: username, Puzzle_number: puzzle_number, Time_easy: time_easy };
              const result = await db.collection("user_times_easy").insertOne(new_user_time);
              var ret = { username: username, puzzle_number: puzzle_number, time_easy: time_easy };
              res.status(200).json(ret);
          } else if (results[0].Time_easy > time_easy) {
              // otherwise check if we need to update the usertime or not
              const filter = { Username: username, Puzzle_number: puzzle_number };
              const update = { $set: { Time_easy: time_easy } };  // Use the $set operator to specify the update
              const result = await db.collection("user_times_easy").updateOne(filter, update);
              var ret = { message: "Successfully updated." };
              res.status(200).json(ret);
          } else {
            var ret = { message: "No need to update." };
            res.status(200).json(ret);
          }
      } catch (e) {
          // return the error with code 500
          error = e.toString();
          var ret = { message: error };
          res.status(500).json(ret);
      }
    }
});

// gets user time of the specific puzzle from the medium set
app.post("/api/getusertime_medium", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number } = req.body;
  
    try {
      const db = client.db("Sudoku");

      const results = await db
      .collection("user_times_medium")
      .find({ Username: username, Puzzle_number: puzzle_number})
      .toArray()

      // check if results is empty, throw error for invalid user/puzzle number with code 501
      if (results.length == 0) {
          code = 501;
          throw new Error("Invalid username/puzzle_number");
      }

      // otherwise if we find the valid combo of username and puzzle number, return it's usertime
      var time_medium = results[0].Time_medium;

      var ret = { time_medium: time_medium };
      res.status(200).json(ret);
    } catch (e) {
    // return the error with code 500
      error = e.toString();
      var ret = { message: error };
      res.status(500).json(ret);
    }
});

// sets user time of the specific puzzle from the medium set
app.post("/api/setusertime_medium", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number, time_medium } = req.body;

    if (puzzle_number < 1 || puzzle_number > 50) {
      var ret = { message: "Error, invalid medium puzzle number." };
      res.status(500).json(ret);
    } else {
      // check if string is empty. if it is, send error in return.
      try {
          const db = client.db("Sudoku");

          const results = await db
          .collection("user_times_medium")
          .find({ Username: username, Puzzle_number: puzzle_number})
          .toArray();

          // check if results is empty, create usertime for that specific puzzle
          if (results.length == 0) {
              const new_user_time = { Username: username, Puzzle_number: puzzle_number, Time_medium: time_medium };
              const result = await db.collection("user_times_medium").insertOne(new_user_time);
              var ret = { username: username, puzzle_number: puzzle_number, time_medium: time_medium };
              res.status(200).json(ret);
          } else if (results[0].Time_medium > time_medium) {
              // otherwise check if we need to update the usertime or not
              const filter = { Username: username, Puzzle_number: puzzle_number };
              const update = { $set: { Time_medium: time_medium } };  // Use the $set operator to specify the update
              const result = await db.collection("user_times_medium").updateOne(filter, update);
              var ret = { message: "Successfully updated." };
              res.status(200).json(ret);
          } else {
            var ret = { message: "No need to update." };
            res.status(200).json(ret);
          }
      } catch (e) {
          // return the error with code 500
          error = e.toString();
          var ret = { message: error };
          res.status(500).json(ret);
      }
    }
});

// gets user time of the specific puzzle from the hard set
app.post("/api/getusertime_hard", async (req, res, next) => {
  var error = "";
  const { username, puzzle_number } = req.body;

  try {
    const db = client.db("Sudoku");

    const results = await db
    .collection("user_times_hard")
    .find({ Username: username, Puzzle_number: puzzle_number})
    .toArray()

    // check if results is empty, throw error for invalid user/puzzle number with code 501
    if (results.length == 0) {
        code = 501;
        throw new Error("Invalid username/puzzle_number");
    }

    // otherwise if we find the valid combo of username and puzzle number, return it's usertime
    var time_hard = results[0].Time_hard;

    var ret = { time_hard: time_hard };
    res.status(200).json(ret);
  } catch (e) {
  // return the error with code 500
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
});

// sets user time of the specific puzzle from the hard set
app.post("/api/setusertime_hard", async (req, res, next) => {
  var error = "";
  const { username, puzzle_number, time_hard } = req.body;

  if (puzzle_number < 1 || puzzle_number > 50) {
    var ret = { message: "Error, invalid hard puzzle number." };
    res.status(500).json(ret);
  } else {
    // check if string is empty. if it is, send error in return.
    try {
        const db = client.db("Sudoku");

        const results = await db
        .collection("user_times_hard")
        .find({ Username: username, Puzzle_number: puzzle_number})
        .toArray();

        // check if results is empty, create usertime for that specific puzzle
        if (results.length == 0) {
            const new_user_time = { Username: username, Puzzle_number: puzzle_number, Time_hard: time_hard };
            const result = await db.collection("user_times_hard").insertOne(new_user_time);
            var ret = { username: username, puzzle_number: puzzle_number, time_hard: time_hard };
            res.status(200).json(ret);
        } else if (results[0].Time_hard > time_hard) {
            // otherwise check if we need to update the usertime or not
            const filter = { Username: username, Puzzle_number: puzzle_number };
            const update = { $set: { Time_hard: time_hard } };  // Use the $set operator to specify the update
            const result = await db.collection("user_times_hard").updateOne(filter, update);
            var ret = { message: "Successfully updated." };
            res.status(200).json(ret);
        } else {
          var ret = { message: "No need to update." };
          res.status(200).json(ret);
        }
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
