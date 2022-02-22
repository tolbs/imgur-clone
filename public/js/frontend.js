function registration() {
    var username = document.getElementById('username');
    var pass = document.getElementById('pass').value;
    var pass_confirm = document.getElementById('pass_confirm').value;

    if (checkUsername(username)) {
        if (checkPassword(pass, pass_confirm)) {
            //alert("Form submitted. Thank you!");
        }
    }

    return false;
}

function checkUsername(input) {
    var alphanumeric = /^[0-9a-zA-Z]+$/;
    if (input.value.match(alphanumeric)) {
        if (input.value.length >= 3) {
            return true;
        }
        else {
            alert("Username must be at least 3 alphanumeric characters long.")
        }
    }
    else {
        alert("Enter only alphanumerics for username.");
    }
}

function checkPassword(pass1, pass2) {
    if (pass1 === pass2) {
        if (pass1.search(/[0-9]/i) > 0) {
            if (pass1.search(/[!@#$%^&*()?]/) > 0) {
                return true;
            }
            else {
                alert("Your password must contain at least one special character");
            }
        }
        else {
            alert("Your password must contain at least one number")
        }
    }
    else {
        alert("Passwords must match.");
    }
}

if (document.cookie.includes("logged")) {
    console.log("user is logged");
    let ele = document.getElementById("authenticate-button");
    ele.innerHTML = "Log Out";
    ele.setAttribute("href", "usermgnt/logout");
} else {
    let ele = document.getElementById("authenticate-button");
    ele.innerHTML = "Log In";
    ele.setAttribute("href", "/login");
}

function setFlashMessageFadeOut(flashElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

let flashElement = document.getElementById("flash-message");
if(flashElement) {
    setFlashMessageFadeOut();
}

function createCard(postData) {
    return `<div id="post-${postData.id}" class="card">
    <img class="card-image" src=${postData.thumbpath} alt="Missing image">
    <div class="card-body">
        <p class="card-title">${postData.title}</p>
        <p class="card-text">${postData.description}</p>
        <a href="/post/${postData.id}" class="anchor-buttons">View Post</a>
    </div>
</div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById("search-text").value;
    if(!searchTerm) {
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById("main-content");
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        let newMainContentHTML = "";
    })
    .catch((err) => console.log(err));
}

let searchButton = document.getElementById("search-button");
searchButton.onclick = executeSearch;