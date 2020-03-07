var fs = require("fs");
var reservations = [];
var waitlist = [];
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Reservations (DATA)
// =============================================================
var newReservation =
  {
    name: "John Doe",
    phone_number: "(123)456-7890",
    email: "test@email.com",
    uniqueID: 0
  };
console.log(newReservation);
reservations.push(newReservation);
console.log(reservations);
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/home"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/tables"));
});
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/reservation"));
  });
// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});
function addToArray() {
    if (reservations.length < 5) {
// Create New Reservation - takes in JSON input
        app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
        var newReservation = req.body;
        newReservation.uniqueID = uniqueID;
        console.log(newReservation);
        reservations.push(newReservation);
        res.json(newReservation);
    });
    } else {
        app.post("/api/waitlist", function(req, res) {
            // req.body hosts is equal to the JSON post sent from the user
            // This works because of our body parsing middleware
        var newReservation = req.body;
        newReservation.uniqueID = uniqueID;
        console.log(newReservation);  
        waitlist.push(newReservation);          
        res.json(newReservation);
        uniqueID++;
        });
    }
}
//create new reservations
app.post("/api/reservations", function(req, res){
    addToArray();
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});