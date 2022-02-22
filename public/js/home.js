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

function fadeout(evt) {
    let opacity = 1;
    while (evt.target.style.opacity > 0) {
        evt.target.opacity = opacity;
        opacity -= 0.1;
    }
    while (evt.target.hasChildNodes()) {
        evt.target.removeChild(evt.target.firstChild);
    }
    evt.target.remove();
}

function createPhotoCard(data, container) {
    var photo = new Image();
    let div = document.createElement("div");
    //let title = document.createElement("p");
    photo.src = data.thumbnailUrl;
    // photo.title = data.title;
    //photo.onclick = "fadeout(evt)";
    div.addEventListener("click", fadeout);
    // div.onclick = fadeout;
    //photo.appendChild(title);
    // div.appendChild(document.createTextNode(data.title));
    div.appendChild(photo);

    document.getElementById("gallery").appendChild(div);

    return photo;
}
let gallery = document.getElementById("gallery");
if (gallery) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {
            let innerHTML = "";
            photos.forEach((photo) => {
                createPhotoCard(photo, gallery);
            });
            document.getElementById("item-count").innerHTML = `There are ${photos.length} photo(s) being shown.`;
        })
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
            if(currentOpacity <= 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashElement.style.opacity = currentOpacity;
        }, 50);
    }, 1000);
}

let flashElement = document.getElementById("flash-message");
if(flashElement) {
    setFlashMessageFadeOut();
}