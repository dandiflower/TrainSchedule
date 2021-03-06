/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCBvo8LwSUuBUVbNHVa0JkiD-DSH87IQLA",
    authDomain: "trainschedule-f1fbf.firebaseapp.com",
    databaseURL: "https://trainschedule-f1fbf.firebaseio.com",
    projectId: "trainschedule-f1fbf",
    storageBucket: "trainschedule-f1fbf.appspot.com",
    messagingSenderId: "744435353719"
};
firebase.initializeApp(config);


// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var database = firebase.database();
// window.onload = function () {

// // initial values
// var tName = "";
// var destination = "";
// var militaryTime = "";
// var freq = "";
// var nextTrain = "";

// --------------------------------------------------------------
// Dynamically update table entry with user information

    $(document).on("click", ".btn", function () {
        event.preventDefault();

        var tName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var militaryTime = $("#starttime").val().trim();
        var freq = $("#freq").val().trim();
 
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(militaryTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % freq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = freq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Creates local "temporary" object for holding employee data
        var train = {
            tName: tName,
            destination: destination,
            freq: freq,
            nextTrain: nextTrain.toLocaleString(),
            tMinutesTillTrain: tMinutesTillTrain,
        };

            

    // Code for handling the push
    database.ref().push(train);

    console.log(train.tName);
    console.log(train.destination);
    console.log(train.militaryTime);
    console.log(train.nextTrain);
    console.log(train.freq);
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        // grab values from textboxes 
        // tName = $("#trainName").val().trim();
        // destination = $("#destination").val().trim();
        // militaryTime = $("#starttime").val().trim();
        // console.log(militaryTime);
        // freq = $("#freq").val().trim();
        // console.log(freq);

    var tName = childSnapshot.val().tName;
    var destination = childSnapshot.val().destination;
    var freq = childSnapshot.val().freq;
    var nextTrain = childSnapshot.val().nextTrain;
    var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;

        // table value input from DOM
        var table = document.getElementById("myTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = tName;
        cell2.innerHTML = destination;
        cell3.innerHTML = freq;
        cell4.innerHTML = nextTrain;
        cell5.innerHTML = tMinutesTillTrain;
        //    console.log(tName);
        //    console.log(destination);

        });







