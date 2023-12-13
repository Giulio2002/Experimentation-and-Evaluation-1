const mongo = require('mongodb');
const path = require("path");
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express(); 
const PORT = 7666;
const dotenv = require("dotenv")
dotenv.config()

let MongoClient = mongo.MongoClient;

var url = process.env.MONGO_URL;
MongoClient.connect(process.env.MONGO_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("surveys", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
});

let metric = []
// Directory where your static files are located
const staticDirPath = path.join(__dirname, "app");

//npm install body-parser --save
app.use(cors());
app.use(express.static(staticDirPath)); // Serve static files
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Fallback for any other GET request
app.get("/survey", (req, res) => {
    res.sendFile(path.join(staticDirPath, "start.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(staticDirPath, "home.html"));
});




// Get the lists
app.get("/metrics", async (req, res) => {

    // read the entire surveys collection and send it back to the client in the response
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     dbo.collection("surveys").find({}).toArray(function(err, result) {
    //         if (err) throw err;
    //         db.close();
    //     });
    // })
    // do the above with async/await
    let client = await MongoClient.connect(url);
    let dbo = client.db("mydb");
    let result = await dbo.collection("surveys").find({}).toArray();
    client.close();
    res.json(result);
})

app.post("/metrics", async (req, res) => {
    // do the above with async/await
    let client = await MongoClient.connect(url);
    let dbo = client.db("mydb");
    console.log(req.body)
    let result = await dbo.collection("surveys").insertOne(req.body);
    client.close();
    res.json(result);
    console.log(result)
})


app.listen(process.env.PORT, (error) => { 
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start", error);
});
