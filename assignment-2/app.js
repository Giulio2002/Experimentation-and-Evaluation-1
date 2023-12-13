const path = require("path");
const express = require('express');
const cors = require('cors');

const app = express(); 
const PORT = 7666;

let metric = []
// Directory where your static files are located
const staticDirPath = path.join(__dirname, "app");

app.use(cors());
app.use(express.static(staticDirPath)); // Serve static files

// Fallback for any other GET request
app.get("/", (req, res) => {
    res.sendFile(path.join(staticDirPath, "start.html"));
});



// Get the lists
app.get("/metrics", (req, res) => {
    res.send(metric);
})


app.listen(PORT, (error) => { 
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start", error);
});
