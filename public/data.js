
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, enableIndexedDbPersistence, addDoc, collection, getDocs, getDoc, doc, onSnapshot, query, limit, where, updateDoc, orderBy, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3UWGcYo66AuqF3CJO_GpaWZt7jjD_bso",
    authDomain: "elevetor-sim.firebaseapp.com",
    projectId: "elevetor-sim",
    storageBucket: "elevetor-sim.firebasestorage.app",
    messagingSenderId: "941580080164",
    appId: "1:941580080164:web:a2d9de1fa8fc671e3634b1",
    measurementId: "G-4M3RTT4KNX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let playerID = localStorage.getItem("playerID");

onSnapshot(query(collection(db, "elevators"), where("id", "==", "nEFOlhdgHbhcSWCJb5y3")), (doc) => {
     if (doc) {
         doc.docChanges().forEach((change) => {
             if (change.type === "modified") {
                 document.getElementById("directionElevato1").innerHTML = "Going " + change.doc.data().direction;
             }
         });
     }
 });
 onSnapshot(query(collection(db, "elevators"), where("id", "==", "oAo68NfSDZm66YhHfSCM")), (doc) => {
     if (doc) {
         doc.docChanges().forEach((change) => {
             if (change.type === "modified") {
                 document.getElementById("directionElevato2").innerHTML = "Going " + change.doc.data().direction;
             }
         });
     }
 });
 
 onSnapshot(query(collection(db, "elevators"), where("id", "==", "ou45vwSmWIu7YjSvmKkM")), (doc) => {
     if (doc) {
         doc.docChanges().forEach((change) => {
             if (change.type === "modified") {
                 document.getElementById("directionElevato3").innerHTML = "Going " + change.doc.data().direction;
             }
         });
     }
 });

onSnapshot(query(collection(db, "requests"), where("id", "==", playerID)), (doc) => {
    if (doc) {
        console.log(doc)
        doc.docChanges().forEach((change) => {
            if (change.type === "modified") {
                document.getElementById('current-floor').innerHTML = change.doc.data().currentFloor;
            }
        });
    }
});

onSnapshot(query(collection(db, "requests")), (doc) => {
    if (doc) {
        console.log(doc)
        doc.docChanges().forEach((change) => {
            if (change.type === "modified") {
                let requests = [];
                let elevator_ID = change.doc.data().elevatorID;
                let requestPlayerID = change.doc.data().id;
                getDocs(query(collection(db, "requests"), where("state", "in", ["awaiting", "on"]))).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        requests.push(doc.data());
                    });
                    if (requestPlayerID !== playerID) {
                        handleElevatorRequests2(elevator_ID, requests);
                    }
                })
            }
        });
    }
});

getDoc(doc(db, "elevators", "nEFOlhdgHbhcSWCJb5y3")).then(docSnap => {
    document.getElementById("directionElevato1").innerHTML = "Going " + docSnap.data().direction;
    document.getElementById("floorElevator1").innerHTML = docSnap.data().floor;
})

getDoc(doc(db, "elevators", "oAo68NfSDZm66YhHfSCM")).then(docSnap => {
    document.getElementById("directionElevato2").innerHTML = "Going " + docSnap.data().direction;
    document.getElementById("floorElevator2").innerHTML = docSnap.data().floor;
})

getDoc(doc(db, "elevators", "ou45vwSmWIu7YjSvmKkM")).then(docSnap => {
    document.getElementById("directionElevato3").innerHTML = "Going " + docSnap.data().direction;
    document.getElementById("floorElevator3").innerHTML = docSnap.data().floor;
})



if (playerID == null) {
    addPlayer()
}

if (playerID !== null) {

    getDoc(doc(db, "requests", playerID)).then(docSnap => {
        document.getElementById('current-floor').innerHTML = docSnap.data().currentFloor;
    })
}


function addPlayer() {
    Swal.fire({
        title: 'Enter player name',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
            if (name) {
                addDoc(collection(db, "players"), {
                    name: name,
                }).then((docRef) => {
                    localStorage.setItem('playerID', docRef.id);
                    setDoc(doc(db, "requests", docRef.id), {
                        id: docRef.id,
                        elevatorID: "",
                        currentFloor: 0,
                        goingToFloor: 0,
                        state: "off"
                    })
                    document.getElementById('current-floor').innerText = 0;
                    updateDoc(doc(db, "players", docRef.id), {
                        id: docRef.id
                    }).then(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Player added successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


document.getElementById('0').addEventListener('click', () => {
    updateFloor(0);
})
document.getElementById('1').addEventListener('click', () => {
    updateFloor(1);
})
document.getElementById('2').addEventListener('click', () => {
    updateFloor(2);
})
document.getElementById('3').addEventListener('click', () => {
    updateFloor(3);
})
document.getElementById('4').addEventListener('click', () => {
    updateFloor(4);
})
document.getElementById('5').addEventListener('click', () => {
    updateFloor(5);
})
document.getElementById('6').addEventListener('click', () => {
    updateFloor(6);
})
document.getElementById('7').addEventListener('click', () => {
    updateFloor(7);
})
document.getElementById('8').addEventListener('click', () => {
    updateFloor(8);
})
document.getElementById('9').addEventListener('click', () => {
    updateFloor(9);
})
document.getElementById('10').addEventListener('click', () => {
    updateFloor(10);
})

// Function to update the floor and save it to local storage
function updateFloor(floor) {
    let mostEfficientElevator = getMostEfficientElevator(document.getElementById("floorElevator1").innerText, document.getElementById("floorElevator2").innerText, document.getElementById("floorElevator3").innerText, document.getElementById('current-floor').innerText, floor);
    if (playerID == null) {
        addPlayer()
    } else {
        var elevator_ID = "";
        if (mostEfficientElevator == "A") {
            elevator_ID = "nEFOlhdgHbhcSWCJb5y3"
            if (parseInt(document.getElementById('current-floor').innerText) < parseInt(floor)) {
                document.getElementById('elevator_up1').src = "assets/img/elevator_upSelected.png"
            }
            if (parseInt(document.getElementById('current-floor').innerText) > parseInt(floor)) {
                document.getElementById('elevator_down1').src = "assets/img/elevator_downSelected.png"
            }
        }
        if (mostEfficientElevator == "B") {
            elevator_ID = "oAo68NfSDZm66YhHfSCM"

            if (parseInt(document.getElementById('current-floor').innerText) < parseInt(floor)) {
                document.getElementById('elevator_up2').src = "assets/img/elevator_upSelected.png"
            }
            if (parseInt(document.getElementById('current-floor').innerText) > parseInt(floor)) {
                document.getElementById('elevator_down2').src = "assets/img/elevator_downSelected.png"
            }
        }
        if (mostEfficientElevator == "C") {
            elevator_ID = "ou45vwSmWIu7YjSvmKkM"
            if (parseInt(document.getElementById('current-floor').innerText) < parseInt(floor)) {
                document.getElementById('elevator_up3').src = "assets/img/elevator_upSelected.png"
            }
            if (parseInt(document.getElementById('current-floor').innerText) > parseInt(floor)) {
                document.getElementById('elevator_down3').src = "assets/img/elevator_downSelected.png"
            }
        }
        setDoc(doc(db, "requests", playerID), {
            id: playerID,
            elevatorID: elevator_ID,
            currentFloor: parseInt(document.getElementById('current-floor').innerText),
            goingToFloor: parseInt(floor),
            state: "awaiting"
        })
        //get requests and put them in an array
        let requests = [];
        getDocs(query(collection(db, "requests"), where("state", "in", ["awaiting", "on"]))).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                requests.push(doc.data());
            });

            handleElevatorRequests(elevator_ID, requests);
        })
    }
}
// Map elevator Firestore IDs to their corresponding elements
const elevatorMapping = {
    "nEFOlhdgHbhcSWCJb5y3": "elevator1",
    "oAo68NfSDZm66YhHfSCM": "elevator2",
    "ou45vwSmWIu7YjSvmKkM": "elevator3"
};

// Function to open an elevator
function openElevator(elevatorId) {
    let elevatorElement = document.getElementById(elevatorMapping[elevatorId]);
    if (!elevatorElement) return;
    document.getElementById("elevatorAudio").play();
    elevatorElement.src = "assets/img/elevator-state-1-opening.gif";

    // Change to open state after 4 seconds
    setTimeout(() => {
        document.getElementById('elevator_up1').src = "assets/img/elevator_up.png"
        document.getElementById('elevator_down1').src = "assets/img/elevator_down.png"
        document.getElementById('elevator_up2').src = "assets/img/elevator_up.png"
        document.getElementById('elevator_down2').src = "assets/img/elevator_down.png"
        document.getElementById('elevator_up3').src = "assets/img/elevator_up.png"
        document.getElementById('elevator_down3').src = "assets/img/elevator_down.png"
        elevatorElement.src = "assets/img/elevator-state-2-open.jpg";
    }, 4000);
}

// Function to close an elevator
function closeElevator(elevatorId) {
    let elevatorElement = document.getElementById(elevatorMapping[elevatorId]);
    if (!elevatorElement) return;
    document.getElementById("elevatorAudio2").play();
    elevatorElement.src = "assets/img/elevator-state-3-closing.gif";

    // Change to closed state after 4 seconds
    setTimeout(() => {
        elevatorElement.src = "assets/img/elevator-state-4-closed.jpg";
    }, 4000);
}

//function pickup passenger
function pickupPassenger(elevatorId) {
    let elevatorElement = document.getElementById(elevatorMapping[elevatorId]);
    if (!elevatorElement) return;
    document.getElementById("elevatorAudio").play();
    elevatorElement.src = "assets/img/elevatorPickUp.gif";

    // Change to closed state after 4 seconds
    setTimeout(() => {
        elevatorElement.src = "assets/img/elevator-state-4-closed.jpg";
        document.getElementById("elevatorAudio2").play();
    }, 8000);
}

// function dropoff passenger
function dropoffPassenger(elevatorId) {
    let elevatorElement = document.getElementById(elevatorMapping[elevatorId]);
    if (!elevatorElement) return;
    document.getElementById("elevatorAudio").play();
    elevatorElement.src = "assets/img/elevatorDropOff.gif";

    // Change to closed state after 4 seconds
    setTimeout(() => {
        elevatorElement.src = "assets/img/elevator-state-4-closed.jpg";
    }, 9000);
}

// Function to handle multiple elevator requests intelligently
async function handleElevatorRequests(elevatorId, requests) {
    if (requests.length === 0) return; // No requests to process

    const elevatorRef = doc(db, "elevators", elevatorId);
    const elevatorSnap = await getDoc(elevatorRef);
    if (!elevatorSnap.exists()) return;

    let elevatorData = elevatorSnap.data();
    let elevatorCurrentFloor = elevatorData.floor;

    //filter requests to only those with the same elevator ID
    requests = requests.filter(request => request.elevatorID === elevatorId);

    // Process each request individually to ensure correct order
    for (let request of requests) {
        let requestCurrentFloor = parseInt(request.currentFloor);
        let requestDestination = parseInt(request.goingToFloor);
        let requestPlayerID = request.id;


        // **Step 1: Move to Passenger's Location**
        if (elevatorCurrentFloor !== requestCurrentFloor) {
            console.log(`Elevator ${elevatorId} moving to floor ${requestCurrentFloor} to pick up passenger...`);
            //show in html   <p id="elevator1state"></p>
            //check if the elevator id 
            if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
                //clear html
                document.getElementById('elevator1state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator1state').innerText = `Elevator A is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });

            }
            if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
                //clear html
                document.getElementById('elevator2state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator2state').innerText = `Elevator B is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });
            }
            if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
                //clear html
                document.getElementById('elevator3state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator3state').innerText = `Elevator C is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });
            }
            await moveElevatorSmoothly(elevatorId, elevatorCurrentFloor, requestCurrentFloor);
            elevatorCurrentFloor = requestCurrentFloor; // Update current floor after reaching
        }

        // **Step 2: Open doors for passenger**
        pickupPassenger(elevatorId);
        console.log(`Elevator ${elevatorId} stopped at floor ${requestCurrentFloor} for 8 seconds to pick up passenger.`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html   
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        await new Promise(resolve => setTimeout(resolve, 8000)); // Stop for 8 seconds

        // **Step 3: Close doors after pickup**
        //closeElevator(elevatorId);
        //await new Promise(resolve => setTimeout(resolve, 4000)); // Door closing animation delay
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A closed doors after picking up ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B closed doors after picking up ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C closed doors after picking up ${playerName}.`;
            });
        }

        // **Step 4: Move to the Passenger’s Destination**
        console.log(`Elevator ${elevatorId} moving from ${requestCurrentFloor} to ${requestDestination}...`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            document.getElementById('elevator1state').innerText = `Elevator A moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html
            document.getElementById('elevator2state').innerText = "";
            document.getElementById('elevator2state').innerText = `Elevator B moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            document.getElementById('elevator3state').innerText = `Elevator C moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        await moveElevatorSmoothly(elevatorId, requestCurrentFloor, requestDestination);

        // **Step 5: Open doors for passenger drop-off**
        dropoffPassenger(elevatorId);
        console.log(`Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            document.getElementById('elevator1state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html
            document.getElementById('elevator2state').innerText = "";
            document.getElementById('elevator2state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            document.getElementById('elevator3state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        await new Promise(resolve => setTimeout(resolve, 8000));

        // **Step 6: Close doors after drop-off**
        //closeElevator(elevatorId);
        //await new Promise(resolve => setTimeout(resolve, 4000)); // Door closing animation delay
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A closed doors after dropping off ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B closed doors after dropping off ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C closed doors after dropping off ${playerName}.`;
            });
        }

        // **Step 7: Update Firestore to mark request as complete**
        await updateDoc(doc(db, "requests", request.id), {
            state: "off",
            currentFloor: requestDestination
        });

        // Update the elevator's last known floor
        elevatorCurrentFloor = requestDestination;
    }
}
async function handleElevatorRequests2(elevatorId, requests) {
    if (requests.length === 0) return; // No requests to process

    const elevatorRef = doc(db, "elevators", elevatorId);
    const elevatorSnap = await getDoc(elevatorRef);
    if (!elevatorSnap.exists()) return;

    let elevatorData = elevatorSnap.data();
    let elevatorCurrentFloor = elevatorData.floor;

    //filter requests to only those with the same elevator ID
    requests = requests.filter(request => request.elevatorID === elevatorId);

    // Process each request individually to ensure correct order
    for (let request of requests) {
        let requestCurrentFloor = parseInt(request.currentFloor);
        let requestDestination = parseInt(request.goingToFloor);
        let requestPlayerID = request.id;


        // **Step 1: Move to Passenger's Location**
        if (elevatorCurrentFloor !== requestCurrentFloor) {
            console.log(`Elevator ${elevatorId} moving to floor ${requestCurrentFloor} to pick up passenger...`);
            //show in html   <p id="elevator1state"></p>
            //check if the elevator id 
            if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
                //clear html
                document.getElementById('elevator1state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator1state').innerText = `Elevator A is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });

            }
            if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
                //clear html
                document.getElementById('elevator2state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator2state').innerText = `Elevator B is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });
            }
            if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
                //clear html
                document.getElementById('elevator3state').innerText = "";
                getPlayerName(requestPlayerID).then(playerName => {
                    document.getElementById('elevator3state').innerText = `Elevator C is moving to floor ${requestCurrentFloor} to pick up ${playerName}...`;
                });
            }
            await moveElevatorSmoothly2(elevatorId, elevatorCurrentFloor, requestCurrentFloor);
            // elevatorCurrentFloor = requestCurrentFloor; // Update current floor after reaching
        }

        // **Step 2: Open doors for passenger**
        console.log(`Elevator ${elevatorId} stopped at floor ${requestCurrentFloor} for 8 seconds to pick up passenger.`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            if (parseInt(document.getElementById("floorElevator1").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            if (parseInt(document.getElementById("floorElevator2").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html   
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            if (parseInt(document.getElementById("floorElevator3").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C stopped at floor ${requestCurrentFloor} for 8 seconds to pick up ${playerName}.`;
            });
        }
        await new Promise(resolve => setTimeout(resolve, 8000)); // Stop for 8 seconds

        // **Step 3: Close doors after pickup**
       
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            if (parseInt(document.getElementById("floorElevator1").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A closed doors after picking up ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            if (parseInt(document.getElementById("floorElevator2").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B closed doors after picking up ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            if (parseInt(document.getElementById("floorElevator3").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C closed doors after picking up ${playerName}.`;
            });
        }
        await new Promise(resolve => setTimeout(resolve, 4000)); // Door closing animation delay
        // **Step 4: Move to the Passenger’s Destination**
        console.log(`Elevator ${elevatorId} moving from ${requestCurrentFloor} to ${requestDestination}...`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            //clear html
            document.getElementById('elevator1state').innerText = "";
            document.getElementById('elevator1state').innerText = `Elevator A moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            //clear html
            document.getElementById('elevator2state').innerText = "";
            document.getElementById('elevator2state').innerText = `Elevator B moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            document.getElementById('elevator3state').innerText = "";
            document.getElementById('elevator3state').innerText = `Elevator C moving from ${requestCurrentFloor} to ${requestDestination}...`;
        }
        await moveElevatorSmoothly2(elevatorId, requestCurrentFloor, requestDestination);

        // **Step 5: Open doors for passenger drop-off**
       
        
       
        console.log(`Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`);
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            if (parseInt(document.getElementById("floorElevator1").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator1state').innerText = "";
            document.getElementById('elevator1state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            if (parseInt(document.getElementById("floorElevator2").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator2state').innerText = "";
            document.getElementById('elevator2state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            if (parseInt(document.getElementById("floorElevator3").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                openElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator3state').innerText = "";
            document.getElementById('elevator3state').innerText = `Passenger dropped off at floor ${requestDestination}. Waiting 8 seconds before closing doors.`;
        }
        await new Promise(resolve => setTimeout(resolve, 8000));

        // **Step 6: Close doors after drop-off**
        await new Promise(resolve => setTimeout(resolve, 4000)); // Door closing animation delay
        //show in html   <p id="elevator1state"></p>
        //check if the elevator id
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            if (parseInt(document.getElementById("floorElevator1").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator1state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator1state').innerText = `Elevator A closed doors after dropping off ${playerName}.`;
            });
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            if (parseInt(document.getElementById("floorElevator2").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            //clear html
            document.getElementById('elevator2state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator2state').innerText = `Elevator B closed doors after dropping off ${playerName}.`;
            });
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            //clear html
            if (parseInt(document.getElementById("floorElevator3").innerText) == parseInt(document.getElementById("current-floor").innerText)) {
                closeElevator(elevatorId);
            }
            document.getElementById('elevator3state').innerText = "";
            getPlayerName(requestPlayerID).then(playerName => {
                document.getElementById('elevator3state').innerText = `Elevator C closed doors after dropping off ${playerName}.`;
            });
        }

        //elevatorCurrentFloor = requestDestination;
    }
}
// Function to move the elevator smoothly through each floor
async function moveElevatorSmoothly(elevatorId, startFloor, endFloor) {
    document.getElementById("elevatorMusic").play();
    const elevatorRef = doc(db, "elevators", elevatorId);
    let direction = startFloor < endFloor ? "up" : "down";
    console.log(`Moving elevator ${elevatorId} from floor ${startFloor} to ${endFloor}...`);

    let floors = direction === "up"
        ? Array.from({ length: endFloor - startFloor + 1 }, (_, i) => startFloor + i)
        : Array.from({ length: startFloor - endFloor + 1 }, (_, i) => startFloor - i);

    for (let floor of floors) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds per floor

        console.log(`Elevator ${elevatorId} reached floor ${floor}`);
        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            document.getElementById("floorElevator1").innerText = floor;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            document.getElementById("floorElevator2").innerText = floor;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            document.getElementById("floorElevator3").innerText = floor;
        }
        // Update Firestore in real-time
        await updateDoc(elevatorRef, {
            floor: floor,
            direction: direction
        });

        // Update UI to show the elevator moving (if applicable)
        updateElevatorUI(elevatorId, floor);
    }
    document.getElementById("elevatorMusic").pause();
}
async function moveElevatorSmoothly2(elevatorId, startFloor, endFloor) {
    //document.getElementById("elevatorMusic").play();
    const elevatorRef = doc(db, "elevators", elevatorId);
    let direction = startFloor < endFloor ? "up" : "down";
    console.log(`Moving elevator ${elevatorId} from floor ${startFloor} to ${endFloor}...`);

    let floors = direction === "up"
        ? Array.from({ length: endFloor - startFloor + 1 }, (_, i) => startFloor + i)
        : Array.from({ length: startFloor - endFloor + 1 }, (_, i) => startFloor - i);

    for (let floor of floors) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds per floor

        console.log(`Elevator ${elevatorId} reached floor ${floor}`);

        if (elevatorId == "nEFOlhdgHbhcSWCJb5y3") {
            document.getElementById("floorElevator1").innerText = floor;
        }
        if (elevatorId == "oAo68NfSDZm66YhHfSCM") {
            document.getElementById("floorElevator2").innerText = floor;
        }
        if (elevatorId == "ou45vwSmWIu7YjSvmKkM") {
            document.getElementById("floorElevator3").innerText = floor;
        }

        // // Update Firestore in real-time
        // await updateDoc(elevatorRef, {
        //     floor: floor,
        //     direction: direction
        // });

        // Update UI to show the elevator moving (if applicable)
        updateElevatorUI(elevatorId, floor);
    }
   // document.getElementById("elevatorMusic").pause();
}

// Function to update the UI (if you have an elevator element)
function updateElevatorUI(elevatorId, floor) {
    let elevatorElement = document.getElementById(elevatorId);
    if (elevatorElement) {
        elevatorElement.innerText = `Elevator ${elevatorId} is at floor ${floor}`;
    }
}

async function getPlayerName(playerID) {
    try {
        const docRef = doc(db, "players", playerID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().name; // Assuming the player's name is stored under the 'name' field
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

// Example usage
getPlayerName("ZN54YOOCDuNbIa9L9yX4").then(playerName => {
    console.log(playerName);
});



function getMostEfficientElevator(elevatorA, elevatorB, elevatorC, accessingFloor, selectedFloor) {
    // Define the floors each door serves
    const doorA = { min: 0, max: 5 };
    const doorB = { min: 0, max: 8 };
    const doorC = { min: 0, max: 10 };

    // Calculate the distance between the accessing floor and each elevator's current location
    const distanceA = Math.abs(elevatorA - accessingFloor);
    const distanceB = Math.abs(elevatorB - accessingFloor);
    const distanceC = Math.abs(elevatorC - accessingFloor);

    // Check if the selected floor is within the range of each door
    const canServeA = selectedFloor >= doorA.min && selectedFloor <= doorA.max;
    const canServeB = selectedFloor >= doorB.min && selectedFloor <= doorB.max;
    const canServeC = selectedFloor >= doorC.min && selectedFloor <= doorC.max;

    // Determine the most efficient elevator based on the distance and the door's range
    let mostEfficientElevator = null;
    let minDistance = Infinity;

    if (canServeA && distanceA < minDistance) {
        minDistance = distanceA;
        mostEfficientElevator = 'A';
    }
    if (canServeB && distanceB < minDistance) {
        minDistance = distanceB;
        mostEfficientElevator = 'B';
    }
    if (canServeC && distanceC < minDistance) {
        minDistance = distanceC;
        mostEfficientElevator = 'C';
    }

    return mostEfficientElevator;
}