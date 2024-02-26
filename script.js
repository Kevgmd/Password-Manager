//Buttons focus style
document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("mousedown", function () {
        this.style.backgroundColor = "#3d3d3d";
    });

    button.addEventListener("mouseup", function () {
        this.style.backgroundColor = "";
    });
    button.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "";
    });
});
//onclick functions
function newPassword() {
    let element = document.getElementsByClassName("insert-container")[0];
    element.style.display = "flex";
}
function abort() {
    let element = document.getElementsByClassName("insert-container")[0];

    element.style.display = "none";
    document.getElementById("inputAlert").style.display = "none";

    document.querySelectorAll("input").forEach(function (input) {
        input.value = "";
    });
}
//create new password (div)
let insertedValues = document.querySelectorAll("input");

function checkInputs() {
    let inputsFilled = true;

    insertedValues.forEach(function (input) {
        if (!input.value.trim()) {
            inputsFilled = false;
        }
    });

    if (inputsFilled) {
        createDiv();
    } else {
        document.getElementById("inputAlert").style.display = "flex";
    }
}

function createDiv() {
    var newDiv = document.createElement("div");
    var newH1 = document.createElement("h1");

    newDiv.className = "password";

    document.getElementById("passwords-container").appendChild(newDiv);
    document.getElementsByClassName("password").appendChild(newH1);

    let element = document.getElementsByClassName("insert-container")[0];

    element.style.display = "none";

    insertedValues.forEach(function (input) {
        input.value = "";
    });
}