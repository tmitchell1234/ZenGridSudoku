const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.MONGODB_URI;

console.log( url );

const client = new MongoClient(url);
client.connect();




app.post('/api/createuser', async(req, res, next) =>
{
    var error = '';

    const { login, password, firstname, lastname, email } = req.body;
    
    const newUser = { Login:login, Password:password, FirstName:firstname, LastName:lastname, Email:email};

    // try to push newuser to Users collection
    try
    {
        const db = client.db('Sudoku');
        const result = await db.collection('Users').insertOne(newUser);

        // return insertedId (or _id) from DB and code 200 if successful
        var ret = { message: result };
        res.status(200).json(ret);
    }
    catch(e)
    {
        // return error and code 500 if failed
        error = e.toString()
        var ret = { message: error };
        res.status(500).json(ret);
    }

});


app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    var code;

    try
    {
        const db = client.db('Sudoku');
        const results = await db.collection('Users').find({Login:login, Password:password}).toArray();

        // check if results is empty, throw error for user not found with code 501
        if (results.length == 0)
        {
            code = 501;
            throw new Error('Invalid username/password');
        }

        // if login succeeds and user with login/passwrord is found, return the _id, firstname, and lastname of user
        var id = results[0]._id;
        var firstname = results[0].FirstName;
        var lastname = results[0].LastName;

        // return id, firstname, and lastname if successful
        var ret = { id:id, firstName:firstname, lastName:lastname };
        res.status(200).json(ret);
    }
    catch(e)
    {
        error = e.toString()

        if (code != 501) code = 500;
        var ret = { message: error };
        res.status(code).json(ret);
    }
});


// gets specific number puzzle from the easy set
app.post('/api/getpuzzle_easy', async (req, res, next) => 
{
    var error = '';
    const { puzzlenumber } = req.body;

    // check if string is empty. if it is, send error in return.
    if (puzzlenumber.length === 0)
    {
        var ret = { message: "Error, no puzzle number given in getpuzzle_easy." };
        res.status(500).json(ret);
    }
    else
    {
        try
        {
            const db = client.db('Sudoku');
            const results = await db.collection('puzzles_easy').find({ puzzle_number : puzzlenumber }).toArray();

            // check if results is empty, throw error for user not found with code 501
            if (results.length == 0)
                throw new Error('Easy puzzle not found');

            // otherwise if we find the designated puzzle, return it's puzzle string
            var puzzlestring = results[0].puzzle_string;
            
            var ret = { puzzlestring : puzzlestring };
            res.status(200).json(ret);
        }
        catch(e)
        {
            // return the error with code 500
            error = e.toString()
            var ret = { message: error };
            res.status(500).json(ret);
        }
    }
});


// gets specific number puzzle from the medium set
app.post('/api/getpuzzle_medium', async (req, res, next) => 
{
    var error = '';
    const { puzzlenumber } = req.body;

    // check if string is empty. if it is, send error in return.
    if (puzzlenumber.length === 0)
    {
        var ret = { message: "Error, no puzzle number given in getpuzzle_medium." };
        res.status(500).json(ret);
    }
    else
    {
        try
        {
            const db = client.db('Sudoku');
            const results = await db.collection('puzzles_medium').find({ puzzle_number : puzzlenumber }).toArray();

            // check if results is empty, throw error for user not found with code 501
            if (results.length == 0)
                throw new Error('Medium puzzle not found');

            // otherwise if we find the designated puzzle, return it's puzzle string
            var puzzlestring = results[0].puzzle_string;
            
            var ret = { puzzlestring : puzzlestring };
            res.status(200).json(ret);
        }
        catch(e)
        {
            // return the error with code 500
            error = e.toString()
            var ret = { message: error };
            res.status(500).json(ret);
        }
    }
});


// gets specific number puzzle from the hard set
app.post('/api/getpuzzle_hard', async (req, res, next) => 
{
    var error = '';
    const { puzzlenumber } = req.body;

    // check if string is empty. if it is, send error in return.
    if (puzzlenumber.length === 0)
    {
        var ret = { message: "Error, no puzzle number given in getpuzzle_hard." };
        res.status(500).json(ret);
    }
    else
    {
        try
        {
            const db = client.db('Sudoku');
            const results = await db.collection('puzzles_hard').find({ puzzle_number : puzzlenumber }).toArray();

            // check if results is empty, throw error for user not found with code 501
            if (results.length == 0)
                throw new Error('Hard puzzle not found');

            // otherwise if we find the designated puzzle, return it's puzzle string
            var puzzlestring = results[0].puzzle_string;
            
            var ret = { puzzlestring : puzzlestring };
            res.status(200).json(ret);
        }
        catch(e)
        {
            // return the error with code 500
            error = e.toString()
            var ret = { message: error };
            res.status(500).json(ret);
        }
    }
});



app.post('/api/addcard', async (req, res, next) =>
{
    // incoming: userId, card
    // outgoing: error
	
    const { userId, card } = req.body;

    const newCard = {Card:card,UserId:userId};
    var error = '';

    try
    {
        const db = client.db('Sudoku');
        const result = db.collection('cards').insertOne(newCard);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});



app.post('/api/searchcards', async (req, res, next) => 
{
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';

    const { userId, search } = req.body;

    var _search = search.trim();
  
    const db = client.db('Sudoku');
    const results = await db.collection('cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
    var _ret = [];
    for( var i = 0; i < results.length; i++ )
    {
        _ret.push( results[i].Card );
    }
  
    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
});

app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
    // Set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => 
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// app.listen(5000); // start Node + Express server on port 5000

app.listen(PORT,() =>
{
    console.log('Server listening on port ' + PORT );
});
