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

        nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            // Code for handling the push
            database.ref().push({
                tName: tName,
                destination: destination,
                militaryTime: militaryTime,
                freq: freq,
                nextTrain: nextTrain,
            });

        });


    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(militaryTime, "HH:mm");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(militaryTime), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % freq;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = freq - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// ----------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes

// database.ref("/starttime").on({
//     //     // Set the local variables for highBidder equal to the stored values in firebase.
//         militaryTime = snapshot.val().militaryTime;
    //     highPrice = parseInt(snapshot.val().highPrice);

    //     // change the HTML to reflect the newly updated local values (most recent information from firebase)
    //     $("#highest-bidder").text(snapshot.val().highBidder);
    //     $("#highest-price").text("$" + snapshot.val().highPrice);

        // Print the local data to the console.

        // console.log(snapshot.val().highPrice);
};


//     // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
//     else {

//         // Change the HTML to reflect the local value in firebase
//         $("#highest-bidder").text(highPrice);
//         $("#highest-price").text("$" + highPrice);

//         // Print the local data to the console.
//         console.log("local High Price");
//         console.log(highBidder);
//         console.log(highPrice);
//     }

//     // If any errors are experienced, log them to console.
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });

// // --------------------------------------------------------------

// Whenever a user clicks the submit-bid button

    


//     var bidderPrice = parseInt($("#bidder-price").val().trim());
//     console.log(bidderPrice);
//     // Log to console the Bidder and Price (Even if not the highest)


//     if (bidderPrice > highPrice) {
//         console.log(bidderPrice);
//         // Alert
//         alert("You are now the highest bidder.");

//         // Save the new price in Firebase
//         database.ref("/bidderData").set({
//             highBidder: bidderName,
//             highPrice: bidderPrice
//         });

//         // Log the new High Price
//         console.log("New High Price!");
//         console.log(bidderName);
//         console.log(bidderPrice);

//         // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
//         highBidder = bidderName;
//         highPrice = parseInt(bidderPrice);

//         // Change the HTML to reflect the new high price and bidder
//         $("#highest-bidder").text(bidderName);
//         $("#highest-price").text("$" + bidderPrice);

//     } else {

//         // Alert
//         alert("Sorry that bid is too low. Try again.");
// 


