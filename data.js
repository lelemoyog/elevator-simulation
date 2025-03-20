
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
                document.getElementById("floorElevator1").innerHTML = change.doc.data().floor;
            }
        });
    }
});
onSnapshot(query(collection(db, "elevators"), where("id", "==", "oAo68NfSDZm66YhHfSCM")), (doc) => {
    if (doc) {
        doc.docChanges().forEach((change) => {
            if (change.type === "modified") {
                document.getElementById("directionElevato2").innerHTML = "Going " + change.doc.data().direction;
                document.getElementById("floorElevator2").innerHTML = change.doc.data().floor;
            }
        });
    }
});

onSnapshot(query(collection(db, "elevators"), where("id", "==", "ou45vwSmWIu7YjSvmKkM")), (doc) => {
    if (doc) {
        doc.docChanges().forEach((change) => {
            if (change.type === "modified") {
                document.getElementById("directionElevato3").innerHTML = "Going " + change.doc.data().direction;
                document.getElementById("floorElevator3").innerHTML = change.doc.data().floor;
            }
        });
    }
});

onSnapshot(query(collection(db, "requests"), where("id", "==", playerID)), (doc) => {
    if (doc) {
        doc.docChanges().forEach((change) => {
            if (change.type === "modified") {
                document.getElementById('current-floor').innerHTML = change.doc.data().currentFloor;
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
                        state:"off"
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
                        });
                    })
                })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


document.getElementById('0').addEventListener('click',()=>{
    updateFloor(0);
})
document.getElementById('1').addEventListener('click',()=>{
    updateFloor(1);
})
document.getElementById('2').addEventListener('click',()=>{
    updateFloor(0);
})
document.getElementById('3').addEventListener('click',()=>{
    updateFloor(3);
})
document.getElementById('4').addEventListener('click',()=>{
    updateFloor(4);
})
document.getElementById('5').addEventListener('click',()=>{
    updateFloor(5);
})
document.getElementById('6').addEventListener('click',()=>{
    updateFloor(6);
})
document.getElementById('7').addEventListener('click',()=>{
    updateFloor(7);
})
document.getElementById('8').addEventListener('click',()=>{
    updateFloor(8);
})
document.getElementById('9').addEventListener('click',()=>{
    updateFloor(9);
})
document.getElementById('10').addEventListener('click',()=>{
    updateFloor(10);
})

// Function to update the floor and save it to local storage
function updateFloor(floor) {
  let mostEfficientElevator = getMostEfficientElevator(document.getElementById("floorElevator1").innerText,document.getElementById("floorElevator2").innerText,document.getElementById("floorElevator3").innerText,document.getElementById('current-floor').innerText,floor);
  if (playerID == null) {
    addPlayer()
}else{
  var elevator_ID = "";
  if(mostEfficientElevator == "A"){
    elevator_ID = "nEFOlhdgHbhcSWCJb5y3"
    if(parseInt(document.getElementById('current-floor').innerText) < parseInt(floor) ){
        document.getElementById('elevator_up1').src = "assets/img/elevator_upSelected.png"
     }
     if(parseInt(document.getElementById('current-floor').innerText) > parseInt(floor) ){
        document.getElementById('elevator_down1').src = "assets/img/elevator_downSelected.png"
     }
  }
  if(mostEfficientElevator == "B"){
    elevator_ID = "oAo68NfSDZm66YhHfSCM"
   
    if(parseInt(document.getElementById('current-floor').innerText) < parseInt(floor) ){
        document.getElementById('elevator_up2').src = "assets/img/elevator_upSelected.png"
     }
     if(parseInt(document.getElementById('current-floor').innerText) > parseInt(floor) ){
        document.getElementById('elevator_down2').src = "assets/img/elevator_downSelected.png"
     }
  }
  if(mostEfficientElevator == "C"){
    elevator_ID = "ou45vwSmWIu7YjSvmKkM"
    if(parseInt(document.getElementById('current-floor').innerText) < parseInt(floor) ){
        document.getElementById('elevator_up3').src = "assets/img/elevator_upSelected.png"
     }
     if(parseInt(document.getElementById('current-floor').innerText) > parseInt(floor) ){
        document.getElementById('elevator_down3').src = "assets/img/elevator_downSelected.png"
     }
  }
  setDoc(doc(db, "requests", playerID), {
    id: playerID,
    elevatorID: elevator_ID,
    currentFloor: parseInt(document.getElementById('current-floor').innerText),
    goingToFloor: parseInt(floor),
    state:"awaiting"
})
handleElevatorRequest(elevator_ID,{
    id: playerID,
    elevatorID: elevator_ID,
    currentFloor: parseInt(document.getElementById('current-floor').innerText),
    goingToFloor: parseInt(floor),
    state:"awaiting"
});

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

    elevatorElement.src = "assets/img/elevator-state-1-opening.gif";

    // Change to open state after 4 seconds
    setTimeout(() => {
        elevatorElement.src = "assets/img/elevator-state-2-open.jpg";
    }, 4000);
}

// Function to close an elevator
function closeElevator(elevatorId) {
    let elevatorElement = document.getElementById(elevatorMapping[elevatorId]);
    if (!elevatorElement) return;

    elevatorElement.src = "assets/img/elevator-state-3-closing.gif";

    // Change to closed state after 4 seconds
    setTimeout(() => {
        elevatorElement.src = "assets/img/elevator-state-4-closed.jpg";
    }, 4000);
}

// Function to handle elevator request and control door behavior
async function handleElevatorRequest(elevatorId, request) {
    const elevatorRef = doc(db, "elevators", elevatorId);
    const requestRef = doc(db, "requests", request.id);

    // Fetch the elevator's current floor
    const elevatorSnap = await getDoc(elevatorRef);
    if (!elevatorSnap.exists()) return;

    let elevatorData = elevatorSnap.data();
    let elevatorCurrentFloor = elevatorData.floor;
    let requestCurrentFloor = parseInt(request.currentFloor);
    let requestDestination = parseInt(request.goingToFloor);

    // Move to request's current floor if not there yet
    if (elevatorCurrentFloor !== requestCurrentFloor) {
        await moveElevator(elevatorId, elevatorCurrentFloor, requestCurrentFloor);
    }

    // Open the elevator doors
    openElevator(elevatorId);

    // Stop for 8 seconds to allow the user to enter
    console.log(`Elevator ${elevatorId} stopped at floor ${requestCurrentFloor} for 8 seconds...`);
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Close the elevator doors
    closeElevator(elevatorId);

    // Wait for 4 seconds (door closing animation time)
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Move to request's destination floor
    await moveElevator(elevatorId, requestCurrentFloor, requestDestination);

    // Mark request as complete
    await updateDoc(requestRef, {
        state: "off",
        currentFloor: requestDestination
    });

    // Open doors at the destination
    openElevator(elevatorId);

    // Stop for 8 seconds at the destination
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Close doors after reaching destination
    closeElevator(elevatorId);
}

// Helper function to move the elevator between floors
async function moveElevator(elevatorId, startFloor, endFloor) {
    const elevatorRef = doc(db, "elevators", elevatorId);
    let direction = startFloor < endFloor ? "up" : "down";

    console.log(`Moving elevator ${elevatorId} from floor ${startFloor} to ${endFloor}...`);

    let floors = direction === "up"
        ? Array.from({ length: endFloor - startFloor + 1 }, (_, i) => startFloor + i)
        : Array.from({ length: startFloor - endFloor + 1 }, (_, i) => startFloor - i);

    for (let floor of floors) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds per floor

        console.log(`Elevator ${elevatorId} reached floor ${floor}`);

        await updateDoc(elevatorRef, {
            floor: floor,
            direction: direction
        });
    }
}



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