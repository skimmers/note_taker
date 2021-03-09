// These are my dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// this tells node that I'm creating an express server
const app = express();
const PORT = process.env.PORT || 8080;

//  Initializes notesData
let notesData = [];

// This sets up data parsing-- Express will interpret it/format data as JSON.
// This is required for API calls!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

// ROUTES
app.get("/api/notes", function (err, res) {
  try {

    notesData = fs.readFileSync("Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);

  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  res.json(notesData);
});

// writes the new note to the json file
app.post("/api/notes", function (req, res) {
  try {
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(notesData);
    notesData = JSON.parse(notesData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    fs.writeFile("./Develop/db/db.json", notesData, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesData));

  } catch (err) {
    throw err;
    console.error(err);
  }
});

// This is the get request endpoints
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

//Starts the server on the port 
app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});
