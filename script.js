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
//button functions
function newPassword() {
    let element = document.getElementsByClassName("insert-container")[0];
    element.style.display = "flex";
    document.querySelector('#delete-confirmation').style.display = 'none';
}
function abort() {
    let element = document.getElementsByClassName("insert-container")[0];

    element.style.display = "none";
    document.getElementById("inputAlert").style.display = "none";

    document.querySelectorAll("input").forEach(function (input) {
        input.value = "";
    });
}
//create new password (new div)
let insertedValues = document.querySelectorAll("input");

function checkInputs() {
    let inputsFilled = true;

    insertedValues.forEach(function (input) {
        if (!input.value.trim()) {
            inputsFilled = false;
        }
    });

    if (inputsFilled) {
        createPassword();
    } else {
        document.getElementById("inputAlert").style.display = "flex";
    }
}

function createPassword() {
    let newPassword = document.createElement("div");
    let newPasswordButtons = document.createElement("div");

    let IDname = document.createElement("h1");
    let emailUsername = document.createElement("h2");
    let password = document.createElement("h3");

    let copyPasswordButton = document.createElement("button");
    let copyEmailButton = document.createElement("button");
    let deletePasswordButton = document.createElement("button");

    let copyPasswordIcon = document.createElement("i");
    let copyEmailIcon = document.createElement("i");
    let deletePasswordIcon = document.createElement("i");

    document.getElementById("passwords-container").appendChild(newPassword);//adds a div to its container
    newPassword.appendChild(IDname);
    newPassword.appendChild(emailUsername);
    newPassword.appendChild(password);

    newPassword.appendChild(newPasswordButtons);
    newPasswordButtons.appendChild(copyPasswordButton);
    newPasswordButtons.appendChild(copyEmailButton);
    newPasswordButtons.appendChild(deletePasswordButton);

    copyPasswordButton.appendChild(copyPasswordIcon);
    copyEmailButton.appendChild(copyEmailIcon);
    deletePasswordButton.appendChild(deletePasswordIcon);

    newPassword.className = "password";
    copyPasswordButton.className = "password-buttons";
    copyEmailButton.className = "password-buttons";
    deletePasswordButton.className = "password-buttons";

    copyPasswordIcon.className = "fa-solid fa-copy fa-xl";
    copyEmailIcon.className = "fa-solid fa-envelope-open-text fa-xl";
    deletePasswordIcon.className = "fa-solid fa-trash-can fa-xl";

    copyPasswordIcon.style.color = "#98da4b";
    copyEmailIcon.style.color = "#98da4b";
    deletePasswordIcon.style.color = "#98da4b";

    IDname.textContent = document.getElementById("nameInput").value;
    emailUsername.textContent = document.getElementById("emailInput").value;
    password.textContent = document.getElementById("passwordInput").value;

    let element = document.getElementsByClassName("insert-container")[0];

    element.style.display = "none";
    document.getElementById("inputAlert").style.display = "none";

    insertedValues.forEach(function (input) {
        input.value = "";
    });
    //newly created button focus animations
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
    //delete newPassword confirmation pop up
    deletePasswordButton.addEventListener("click", function () {
        deletePasswordIcon.style.color = '#da4b4b';

        deletePasswordButton.addEventListener('click', function () {
            newPassword.remove();
        });
    });
    //copy to clipboard buttons
    copyPasswordButton.addEventListener("click", function () {

        let passwordToCopy = password.textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = passwordToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });

    copyEmailButton.addEventListener("click", function () {

        let emailToCopy = emailUsername.textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = emailToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });
}