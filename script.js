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
    let element = document.querySelector(".insert-container");
    element.style.display = "flex";
    document.querySelector('#delete-confirmation').style.display = 'none';
}
function abort() {
    let element = document.querySelector(".insert-container");

    element.style.display = "none";
    document.querySelector(".inputAlert").classList.remove('visible');
    document.querySelector(".inputAlert").classList.add('hidden');

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
        document.querySelector('.inputAlert').classList.remove('hidden');
        document.querySelector('.inputAlert').classList.add('visible');

        setTimeout(function () {
            var alertElement = document.querySelector('.inputAlert');
            alertElement.classList.remove('visible');
            alertElement.classList.add('hidden');
        }, 1500);
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

    let realPassword = document.getElementById("passwordInput").value;

    document.getElementById("passwords-container").appendChild(newPassword);
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

    let insertElement = document.querySelector(".insert-container");

    insertElement.style.display = "none";

    insertedValues.forEach(function (input) {
        input.value = "";
    });
    //created passwords button focus animations
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
    //delete password confirmation
    deletePasswordButton.addEventListener('click', function () {
        newPassword.remove();
    });
    //copy to clipboard buttons
    copyPasswordButton.addEventListener("click", function () {

        document.querySelector('.clipboardAlert').classList.remove('hidden');
        document.querySelector('.clipboardAlert').classList.add('visible');

        setTimeout(function () {
            var element = document.querySelector('.clipboardAlert');
            element.classList.remove('visible');
            element.classList.add('hidden');
        }, 500);

        let passwordToCopy = realPassword;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = passwordToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });

    copyEmailButton.addEventListener("click", function () {

        document.querySelector('.clipboardAlert').classList.remove('hidden');
        document.querySelector('.clipboardAlert').classList.add('visible');

        setTimeout(function () {
            var element = document.querySelector('.clipboardAlert');
            element.classList.remove('visible');
            element.classList.add('hidden');
        }, 500);

        let emailToCopy = emailUsername.textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = emailToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });
    //display and hide password
    password.addEventListener('mouseenter', function () {
        password.textContent = realPassword;
    });

    password.addEventListener('mouseleave', function () {
        password.textContent = "*".repeat(realPassword.length);
    });
}
//Node.js client side
async function saveText() {
    const getName = document.getElementById("nameInput").value;
    const getEmail = document.getElementById("emailInput").value;
    const getPassword = document.getElementById("passwordInput").value;

    const response = await fetch('/Password-Manager/get-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    });

    if (response.ok) {
        console.log('password saved successfully');
        loadText();
    } else {
        console.error('Error saving password:', response.statusText);
    }
}

async function loadPassword() {
    const response = await fetch('/Password-Manager/get-data');
    const data = await response.json();
    const newPasswordContainer = document.getElementById("passwords-container");

    data.forEach(entry => {
        let IDname = document.createElement("h1");
        let emailUsername = document.createElement("h2");
        let password = document.createElement("h3");

        IDname.value = entry.name;
        emailUsername.value = entry.email;
        password.value = entry.password;

        newPasswordContainer.appendChild(newPassword);

        newPassword.appendChild(IDname);
        newPassword.appendChild(emailUsername);
        newPassword.appendChild(password);

    });
}

loadPassword();