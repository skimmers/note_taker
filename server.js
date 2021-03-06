// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Telling node we'e creating "express" server
const app = express();
const PORT = process.env.PORT || 8000;

// Initialize notesData
let notesData = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "develop/public")));

// Routes
app.get("/api/notes", function(err, res){
    try {
        notesData = fs.readFileSync("develop/db/db.json", utf8);
        notesData = JSON.parse(notesData);
    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesData);
});



// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
  });