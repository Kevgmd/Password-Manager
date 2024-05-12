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

function createPasswordElement(user) {
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

    IDname.textContent = user.name;
    emailUsername.textContent = user.email;
    password.textContent = "*".repeat(user.password.length);

    let insertElement = document.querySelector(".insert-container");

    insertElement.style.display = "none";

    insertedValues.forEach(function (input) {
        input.value = "";
    });
    //delete password button
    deletePasswordButton.addEventListener("click", function () {
        let storedPasswords = JSON.parse(localStorage.getItem("storedPasswords")) || [];

        let index = storedPasswords.findIndex(function (user) {
            return user.name === IDname.textContent && user.email === emailUsername.textContent;
        });

        if (index !== -1) {
            storedPasswords.splice(index, 1);

            localStorage.setItem("storedPasswords", JSON.stringify(storedPasswords));

            newPassword.remove();
        } else {
            console.log("User not found");
        }
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

        let passwordToCopy = IDname.textContent;

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
        password.textContent = user.password;
    });

    password.addEventListener('mouseleave', function () {
        password.textContent = "*".repeat(user.password.length);
    });

    return newPassword;
}

function createPassword() {
    let storedPasswords = JSON.parse(localStorage.getItem("storedPasswords")) || [];

    let newPasswordObj = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value
    };
    storedPasswords.push(newPasswordObj);

    localStorage.setItem("storedPasswords", JSON.stringify(storedPasswords));

    let lastPassword = storedPasswords[storedPasswords.length - 1];

    let newPassword = createPasswordElement(lastPassword);
    document.getElementById("passwords-container").appendChild(newPassword);
    //passwords button focus animations
    document.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("mousedown", function () {
            button.style.backgroundColor = "#3d3d3d";
        });

        button.addEventListener("mouseup", function () {
            button.style.backgroundColor = "";
        });
        button.addEventListener("mouseleave", function () {
            button.style.backgroundColor = "";
        });
    });
}

function displayPasswordsOnLoad() {
    let storedPasswords = JSON.parse(localStorage.getItem("storedPasswords")) || [];

    if (storedPasswords) {
        storedPasswords.forEach(function (user) {
            let newPassword = createPasswordElement(user);
            document.getElementById("passwords-container").appendChild(newPassword);
        });
    }
    //passwords button focus animations
    document.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("mousedown", function () {
            button.style.backgroundColor = "#3d3d3d";
        });

        button.addEventListener("mouseup", function () {
            button.style.backgroundColor = "";
        });
        button.addEventListener("mouseleave", function () {
            button.style.backgroundColor = "";
        });
    });
}

window.addEventListener('load', displayPasswordsOnLoad);
//Download passwords related code
function downloadPasswords() {
    let storedPasswords = JSON.parse(localStorage.getItem("storedPasswords")) || [];

    let fileContent = "";

    storedPasswords.forEach(function (user) {
        fileContent += `${user.name}\n${user.email}\n${user.password}\n\n`;
    });


    let blob = new Blob([fileContent], { type: 'text/plain' });

    let link = document.createElement('a');
    link.download = 'passwords.txt';
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}