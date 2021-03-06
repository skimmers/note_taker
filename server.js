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

//writes new note to json file
app.post("/api/notes", function(rrq, res) {
    try{
        notesData = fs.readFileSync(".develop/db/db.son", "utf");
        console.log(notesData);
        notesData = JSON.parse(notesData);
        requestAnimationFrame.body.id = notesData.length;
        notesData.push(req.body);
        notesData = JSON.stringify(notesData);
        fs.writeFile(".develop/db/db.json", notesData, "utf8", function(err){
            if (err) throw err;
        });
        res.json(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.error(err);
    }
});



// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
  });

