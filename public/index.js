
//elements
const directionElevato1 = document.getElementById("directionElevato1");
const directionElevato2 = document.getElementById("directionElevato2");
const directionElevato3 = document.getElementById("directionElevato3");
const floorElevator1 = document.getElementById("floorElevator1");
const floorElevator2 = document.getElementById("floorElevator2");
const floorElevator3 = document.getElementById("floorElevator3");
const current_flow = document.getElementById('current-floor');
const  elevator1  = document.getElementById('elevator1');
const  elevator2  = document.getElementById('elevator2');
const  elevator3  = document.getElementById('elevator3');
const elevator_up = document.getElementById('elevator_up');
const elevator_down = document.getElementById('elevator_down');




//open elevator

function openElevator1(){
    document.getElementById('elevator1').src = "assets/img/elevator-state-1-opening.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator1').src = "assets/img/elevator-state-2-open.jpg";
}, 4000);
}

function openElevator2(){
    document.getElementById('elevator2').src = "assets/img/elevator-state-1-opening.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator2').src = "assets/img/elevator-state-2-open.jpg";
}, 4000);
}

function openElevator3(){
    document.getElementById('elevator3').src = "assets/img/elevator-state-1-opening.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator3').src = "assets/img/elevator-state-2-open.jpg";
}, 4000);
}

window.onload = function() {
    document.body.style.zoom = "75%";
};
//cloze elevator
closeEvevator1()
function closeEvevator1(){
    document.getElementById('elevator1').src = "assets/img/elevator-state-3-closing.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator1').src = "assets/img/elevator-state-4-closed.jpg";
}, 4000);
}
closeEvevator2()
function closeEvevator2(){
    document.getElementById('elevator2').src = "assets/img/elevator-state-3-closing.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator2').src = "assets/img/elevator-state-4-closed.jpg";
}, 4000);
}
closeEvevator3()
function closeEvevator3(){
    document.getElementById('elevator3').src = "assets/img/elevator-state-3-closing.gif"
    // Change the elevator state after 4000ms
setTimeout(function() {
    document.getElementById('elevator3').src = "assets/img/elevator-state-4-closed.jpg";
}, 4000);
}




