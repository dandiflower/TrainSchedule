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
window.onload = function () {

// initial values
var tName = "";
var destination = "";
var militaryTime = "";
var freq = "";
var nextTrain = "";

// --------------------------------------------------------------
// Dynamically update table entry with user information

    $(document).on("click", ".btn", function () {
        event.preventDefault();



            // table value input
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

  
        // grab values form textboxes 
        tName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        militaryTime = $("#starttime").val().trim();
        // console.log(militaryTime);
        freq = $("#freq").val().trim();
        // console.log(freq);
        
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(militaryTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % freq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = freq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            // Code for handling the push
            database.ref().push({
                tName: tName,
                destination: destination,
                militaryTime: militaryTime,
                freq: freq,
                nextTrain: nextTrain,
            });

        });
};






