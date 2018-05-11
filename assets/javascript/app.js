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
// --------------------------------------------------------------
// Dynamically update table entry with user information

    $(document).on("click", ".btn", function () {
        // Initial Values
        var tName = $("#trainName").val();
        console.log(tName);
        var destination = $("#destination").val();
        // var frequency = initial;
        // var nextArrival = initial;
        // var minAway = tbd;
       console.log(tName);
       console.log(destination);

            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = tName;
            cell2.innerHTML = destination;
            cell3.innerHTML = var frequency;
        

    });

};


// ----------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
// database.ref("/bidderData").on("value", function (snapshot) {

//     // If Firebase has a highPrice and highBidder stored (first case)
//     if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

//         // Set the local variables for highBidder equal to the stored values in firebase.
//         highBidder = snapshot.val().highBidder;
//         highPrice = parseInt(snapshot.val().highPrice);

//         // change the HTML to reflect the newly updated local values (most recent information from firebase)
//         $("#highest-bidder").text(snapshot.val().highBidder);
//         $("#highest-price").text("$" + snapshot.val().highPrice);

//         // Print the local data to the console.
//         console.log(snapshot.val().highBidder);
//         console.log(snapshot.val().highPrice);
//     }

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

// // Whenever a user clicks the submit-bid button
// $("#submit-bid").on("click", function (event) {
//     event.preventDefault();

//     // Get the input values
//     var bidderName = $("#bidder-name").val().trim();
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
//     }
// });
