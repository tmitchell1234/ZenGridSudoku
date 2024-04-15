// require components
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");


// // NEW in OAuth2 verification: using Google APIs:
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;


const path = require("path");
const { ObjectId } = require("mongodb");
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
// SENDGRID TESTING:

// console.log("process.env.SENDGRID_API_KEY = " + process.env.SENDGRID_API_KEY);
// console.log("process.env.SENDGRID_PASS = " + process.env.SENDGRID_PASS);

// let transporter = nodemailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 587,
//     auth: {
//       user: "apikey",
//       pass: process.env.SENDGRID_PASS
//     }
// });

// var mailConfigurations = {
//     from: process.env.EMAIL_USER,
//     to: "",
//     subject: "ZenGrid Sudoku email verification",
//     text: ""
// };



// begin section for APIs
app.post("/api/createuser", async (req, res, next) => {
  var error = "";

  const { username, email, password } = req.body;

  // try to push newuser to Users collection
  try {
    const db = client.db("Sudoku");

    // Check if the email already exists in the database
    const emailExists = await db.collection("Users").findOne({ Email: email });

    // If the email exists, return an error message
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists." });
    }

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

    console.log("Token is " + token);
  
    // change the email data to send to the user's entered email address
    mailConfigurations.to = email;
    mailConfigurations.text = "Thank you for registering for ZenGrid Sudoku!\n" +
                              "Please click the following link to verify your account:\n" +
                              `https://sudokuapp-f0e20225784a.herokuapp.com/verificationpage?token=${token}`;
                               //`http://localhost:3000/verificationpage?token=${token}`;

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
    // const token = req.query.token;
    const { token } = req.body;

    // console.log("Inside server: token = " + token);

    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const decodedId = new ObjectId(decoded.userId);
        // console.log("decodedId = ");
        // console.log(decodedId);

        // find the user by decoded.userId
        const db = client.db("Sudoku");

        const result = await db
            .collection("Users")
            .findOne({ _id: decodedId });

        // console.log("result = ");
        // console.log(result);

        // if the user is found and they are not verified, update their verification status
        if (result.Verified === false)
        {
            db.collection("Users").updateOne(
                { _id: result._id },
                { $set: { Verified: true } }
            );

            var message = "User verified successfully!";
            var ret = { message: message };
            res.status(200).json(ret);
        }
        else
        {
            console.log("User already verified!");

            var message = "User already verified!";
            var ret = { message: message };
            res.status(200).json(ret);
        }
    }
    catch (e)
    {
        console.log("Error:");
        console.log(e);
    }

});

app.delete("/api/deleteuser", async (req, res) => {
  const { email } = req.body;

  try {
    const db = client.db("Sudoku");

    // Delete the user with the specified email
    const result = await db.collection("Users").deleteOne({ Email: email });

    if (result.deletedCount === 0) {
      // No user found with the provided email, or no deletion occurred
      return res.status(404).json({ message: "User not found or already deleted." });
    }

    // User was found and deleted
    res.status(200).json({ message: "User deleted successfully." });
  } catch (e) {
    console.error('Error deleting user:', e);
    res.status(500).json({ message: "An error occurred while deleting the user." });
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


    // NEW: Return verified status
    var Verified = results[0].Verified;


    // return id, username, and verified status
    var ret = { id: id, Username: username, Verified: Verified };
    res.status(200).json(ret);
  }
  catch (e)
  {
    error = e.toString();

    if (code != 501) code = 500;
    var ret = { message: error };
    res.status(code).json(ret);
  }
});

// gets specific number puzzle from the easy set
app.post("/api/getpuzzle_devtest", async (req, res, next) => {
  var error = "";
  var code;
  const { puzzle_number } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzle_number.length === 0) {
    var ret = {
      message: "Error, no puzzle number given in getpuzzle_devtest.",
    };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("devtestpuzzle")
        .find({ puzzle_number: puzzle_number })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) {
        code = 501;
        throw new Error("Devtest puzzle not found");
      } 

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
  }
});

// gets specific number puzzle from the easy set
app.post("/api/getpuzzle_easy", async (req, res, next) => {
  var error = "";
  var code;
  const { puzzle_number } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzle_number.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_easy." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_easy")
        .find({ puzzle_number: puzzle_number })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) {
        code = 501;
        throw new Error("Easy puzzle not found");
      } 

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
  }
});

// gets specific number puzzle from the medium set
app.post("/api/getpuzzle_medium", async (req, res, next) => {
  var error = "";
  var code;
  const { puzzle_number } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzle_number.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_medium." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_medium")
        .find({ puzzle_number: puzzle_number })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) {
        code = 501;
        throw new Error("Medium puzzle not found");
      } 

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
  }
});

// gets specific number puzzle from the hard set
app.post("/api/getpuzzle_hard", async (req, res, next) => {
  var error = "";
  var code;
  const { puzzle_number } = req.body;

  // check if string is empty. if it is, send error in return.
  if (puzzle_number.length === 0) {
    var ret = { message: "Error, no puzzle number given in getpuzzle_hard." };
    res.status(500).json(ret);
  } else {
    try {
      const db = client.db("Sudoku");
      const results = await db
        .collection("puzzles_hard")
        .find({ puzzle_number: puzzle_number })
        .toArray();

      // check if results is empty, throw error for user not found with code 501
      if (results.length == 0) {
        code = 501;
        throw new Error("Hard puzzle not found");
      }

      // otherwise if we find the designated puzzle, return it's puzzle string
      var puzzlestring = results[0].puzzle_string;

      var ret = { puzzlestring: puzzlestring };
      res.status(200).json(ret);
    } catch (e) {
      // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
  }
});

// gets user time of the specific puzzle from the easy set
app.post("/api/getusertime_easy", async (req, res, next) => {
    var error = "";
    var code;
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

      var ret = { time: time_easy };
      res.status(200).json(ret);
    } catch (e) {
    // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
});

// sets user time of the specific puzzle from the easy set
// update the leaderboard after the setting is done
app.post("/api/setusertime_easy", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number, time_easy } = req.body;

    if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
      var ret = { message: "Error, invalid easy puzzle number." };
      res.status(501).json(ret);
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
          
          // getting the top 5 and update the leaderboard
          // Perform an aggregation to get the top times per puzzle number
          const leaderboard = await db.collection("user_times_easy")
          .aggregate([
            { $match: { Puzzle_number: puzzle_number } },
            { $sort: { Time_easy: 1 } },
            { $limit: 5 },
            {
              $group: {
                _id: "$Puzzle_number", // Group by puzzle number
                users: {
                  $push: {
                    username: "$Username",
                    time: "$Time_easy"
                  }
                }
              }
            }
          ]).toArray();

          // The above will give us a document per puzzle_number with a users array

          // Now we need to update the leaderboards_easy collection with this data
          if (leaderboard.length > 0) {
            await db.collection("leaderboards_easy").updateOne(
              { Puzzle_number: puzzle_number },
              { $set: { Users: leaderboard[0].users } },
              { upsert: true } // This creates a new document if one doesn't exist
            );
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
    var code;
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

      var ret = { time: time_medium };
      res.status(200).json(ret);
    } catch (e) {
    // return the error with code 500
      error = e.toString();
      if (code != 501) code = 500;
      var ret = { message: error };
      res.status(code).json(ret);
    }
});

// sets user time of the specific puzzle from the medium set
// update the leaderboard after the setting is done
app.post("/api/setusertime_medium", async (req, res, next) => {
    var error = "";
    const { username, puzzle_number, time_medium } = req.body;

    if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
      var ret = { message: "Error, invalid medium puzzle number." };
      res.status(501).json(ret);
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
    
          // getting the top 5 and update the leaderboard
          // Perform an aggregation to get the top times per puzzle number
          const leaderboard = await db.collection("user_times_medium")
          .aggregate([
            { $match: { Puzzle_number: puzzle_number } },
            { $sort: { Time_medium: 1 } },
            { $limit: 5 },
            {
              $group: {
                _id: "$Puzzle_number", // Group by puzzle number
                users: {
                  $push: {
                    username: "$Username",
                    time: "$Time_medium"
                  }
                }
              }
            }
          ]).toArray();

          // The above will give us a document per puzzle_number with a users array

          // Now we need to update the leaderboards_medium collection with this data
          if (leaderboard.length > 0) {
            await db.collection("leaderboards_medium").updateOne(
              { Puzzle_number: puzzle_number },
              { $set: { Users: leaderboard[0].users } },
              { upsert: true } // This creates a new document if one doesn't exist
            );
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
  var code;
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

    var ret = { time: time_hard };
    res.status(200).json(ret);
  } catch (e) {
  // return the error with code 500
    error = e.toString();
    if (code != 501) code = 500;
    var ret = { message: error };
    res.status(code).json(ret);
  }
});

// sets user time of the specific puzzle from the hard set
// update the leaderboard after the setting is done
app.post("/api/setusertime_hard", async (req, res, next) => {
  var error = "";
  const { username, puzzle_number, time_hard } = req.body;

  if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
    var ret = { message: "Error, invalid hard puzzle number." };
    res.status(501).json(ret);
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
        
        // getting the top 5 and update the leaderboard
        // Perform an aggregation to get the top times per puzzle number
        const leaderboard = await db.collection("user_times_hard")
        .aggregate([
          { $match: { Puzzle_number: puzzle_number } },
          { $sort: { Time_hard: 1 } },
          { $limit: 5 },
          {
            $group: {
              _id: "$Puzzle_number", // Group by puzzle number
              users: {
                $push: {
                  username: "$Username",
                  time: "$Time_hard"
                }
              }
            }
          }
        ]).toArray();

        // The above will give us a document per puzzle_number with a users array

        // Now we need to update the leaderboards_hard collection with this data
        if (leaderboard.length > 0) {
          await db.collection("leaderboards_hard").updateOne(
            { Puzzle_number: puzzle_number },
            { $set: { Users: leaderboard[0].users } },
            { upsert: true } // This creates a new document if one doesn't exist
          );
        }
    } catch (e) {
        // return the error with code 500
        error = e.toString();
        var ret = { message: error };
        res.status(500).json(ret);
    }
  }
});

// get easy leaderboard for a specified puzzle number
app.post("/api/getleaderboard_easy", async (req, res, next) => {
  var error = "";
  const { puzzle_number } = req.body;

  try {
    const db = client.db("Sudoku");

    if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
        var ret = { message: "Error, invalid easy puzzle number." };
        return res.status(501).json(ret);
    }

    // Fetch the leaderboard for the given puzzle number
    const leaderboard = await db.collection("leaderboards_easy")
      .findOne({ Puzzle_number: puzzle_number });

    if (!leaderboard) {
      return res.status(404).send({ message: "No one has a record! Leaderboard not found." });
    }
    res.status(200).json(leaderboard);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
});

// get medium leaderboard for a specified puzzle number
app.post("/api/getleaderboard_medium", async (req, res, next) => {
  var error = "";
  const { puzzle_number } = req.body;

  try {
    const db = client.db("Sudoku");

    if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
        var ret = { message: "Error, invalid medium puzzle number." };
        return res.status(501).json(ret);
    }

    // Fetch the leaderboard for the given puzzle number
    const leaderboard = await db.collection("leaderboards_medium")
      .findOne({ Puzzle_number: puzzle_number });

    if (!leaderboard) {
      return res.status(404).send({ message: "No one has a record! Leaderboard not found." });
    }
    res.status(200).json(leaderboard);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
});

// get hard leaderboard for a specified puzzle number
app.post("/api/getleaderboard_hard", async (req, res, next) => {
  var error = "";
  const { puzzle_number } = req.body;

  try {
    const db = client.db("Sudoku");

    if (isNaN(puzzle_number) || puzzle_number < 1 || puzzle_number > 50) {
        var ret = { message: "Error, invalid hard puzzle number." };
        return res.status(501).json(ret);
    }

    // Fetch the leaderboard for the given puzzle number
    const leaderboard = await db.collection("leaderboards_hard")
      .findOne({ Puzzle_number: puzzle_number });

    if (!leaderboard) {
      return res.status(404).send({ message: "No one has a record! Leaderboard not found." });
    }
    res.status(200).json(leaderboard);
  } catch (e) {
    // return error and code 500 if failed
    error = e.toString();
    var ret = { message: error };
    res.status(500).json(ret);
  }
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
