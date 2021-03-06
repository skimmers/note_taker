// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Telling node we'e creating "express" server
const app = express();
const PORT = process.env.PORT || 8080;

// Initialize notesData
let notesData = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Develope/public")));

// Routes
