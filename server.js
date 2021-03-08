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

