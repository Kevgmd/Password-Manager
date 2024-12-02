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
    let clipboardAlert = document.querySelector(".insert-container");
    clipboardAlert.style.display = "flex";
    document.querySelector('#delete-confirmation').style.display = 'none';
}
function abort() {
    let insertContainer = document.querySelector(".insert-container");

    insertContainer.style.display = "none";
    document.querySelector(".inputAlert").classList.remove('visible');
    document.querySelector(".inputAlert").classList.add('hidden');

    document.querySelectorAll("input").forEach(function (input) {
        input.value = "";
    });
}
//create new password (create new div)
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
        let inputAlert = document.querySelector('.inputAlert');

        document.querySelector('.inputAlert').classList.remove('hidden');
        document.querySelector('.inputAlert').classList.add('visible');
        inputAlert.style.display = "flex";

        setTimeout(function () {
            inputAlert.classList.remove('visible');
            inputAlert.classList.add('hidden');
            setTimeout(function () {
                inputAlert.style.display = "none";
            }, 500);

        }, 1000);
    }
}

function createPasswordElement(user) {
    let newPassword = document.createElement("div");
    let newPasswordButtons = document.createElement("div");

    let emailUsername = document.createElement("h2");
    let IDname = document.createElement("h1");
    let password = document.createElement("h3");

    let copyEmailButton = document.createElement("button");
    let copyPasswordButton = document.createElement("button");
    let deletePasswordButton = document.createElement("button");

    let copyEmailIcon = document.createElement("i");
    let copyPasswordIcon = document.createElement("i");
    let deletePasswordIcon = document.createElement("i");

    newPassword.appendChild(IDname);
    newPassword.appendChild(emailUsername);
    newPassword.appendChild(password);

    newPassword.appendChild(newPasswordButtons);
    newPasswordButtons.appendChild(copyEmailButton);
    newPasswordButtons.appendChild(copyPasswordButton);
    newPasswordButtons.appendChild(deletePasswordButton);

    copyEmailButton.appendChild(copyEmailIcon);
    copyPasswordButton.appendChild(copyPasswordIcon);
    deletePasswordButton.appendChild(deletePasswordIcon);

    copyPasswordButton.className = "password-buttons";
    newPassword.className = "password";
    copyEmailButton.className = "password-buttons";
    deletePasswordButton.className = "password-buttons";

    copyPasswordIcon.className = "fa-solid fa-copy fa-xl";
    copyEmailIcon.className = "fa-solid fa-envelope-open-text fa-xl";
    deletePasswordIcon.className = "fa-solid fa-trash-can fa-xl";

    copyPasswordIcon.style.color = "#98da4b";
    copyEmailIcon.style.color = "#98da4b";
    deletePasswordIcon.style.color = "#98da4b";

    emailUsername.textContent = user.email;
    IDname.textContent = user.name;
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
        }
    });
    //copy to clipboard buttons
    copyPasswordButton.addEventListener("click", function () {
        let clipboardAlert = document.querySelector('.clipboardAlert');

        document.querySelector('.clipboardAlert').classList.remove('hidden');
        document.querySelector('.clipboardAlert').classList.add('visible');
        clipboardAlert.style.display = "flex";

        setTimeout(function () {
            clipboardAlert.classList.remove('visible');
            clipboardAlert.classList.add('hidden');

            setTimeout(function () {
                clipboardAlert.style.display = "none";
            }, 500);

        }, 500);

        let passwordToCopy = user.password;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = passwordToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });

    copyEmailButton.addEventListener("click", function () {

        let clipboardAlert = document.querySelector('.clipboardAlert');

        document.querySelector('.clipboardAlert').classList.remove('hidden');
        document.querySelector('.clipboardAlert').classList.add('visible');
        clipboardAlert.style.display = "flex";

        setTimeout(function () {
            clipboardAlert.classList.remove('visible');
            clipboardAlert.classList.add('hidden');

            setTimeout(function () {
                clipboardAlert.style.display = "none";
            }, 500);

        }, 500);

        let emailToCopy = user.email;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = emailToCopy;
        document.getElementById('passwords-container').appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.getElementById('passwords-container').removeChild(tempTextArea);
    });
    //display and hide password
    let passwordIsVisible = false;

    password.addEventListener('click', function () {
        password.textContent = passwordIsVisible ? "*".repeat(user.password.length) : user.password; //Password equals the passwordIsVisible Variable, and if the password is visible, the password will toggle and turn into asterisks on click, and if its not visible (with asterisks), it will be visible when clicked.
        passwordIsVisible = !passwordIsVisible;
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
    link.download = 'MyPasswords.txt';
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}