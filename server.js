// Creating DEPENDENCIES
const express = require("express");
const path = require("path");
const fs = require("fs");

// Tell node that we are creating an "express" server
const app = express();
const PORT = process.env.PORT || 8080;

//  Initialize notesData
let notesData = [];

// Set up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ROUTES
// ============================================================================
app.get("/api/notes", function(err, res) {
  try {
    
    notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);

  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  res.json(notesData);
});

// writes the new note to the json file
app.post("/api/notes", function(req, res) {
  try {
    notesData = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesData);
    notesData = JSON.parse(notesData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesData));

  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Delete a note

app.delete("/api/notes/:id", function(req, res) {
  try {
    notesData = fs.readFileSync("./db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(function(note) {
      return note.id != req.params.id;
    });
    notesData = JSON.stringify(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
      if (err) throw err;
    });

    res.send(JSON.parse(notesData));

  } catch (err) {
    throw err;
    console.log(err);
  }
});

// HTML GET Requests
// Web page when the Get started button is clicked
app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});



// Start the server on the port
app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});