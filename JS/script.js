//nav bar 
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 0);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const header = document.querySelector("header");
    window.addEventListener("scroll", function() {
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    });
  });
  

document.addEventListener('DOMContentLoaded', (event) => {
    let menu = document.querySelector('#menu-icon');
    let navlist = document.querySelector('.navlist');

    if (menu && navlist) { // Check if both elements exist
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navlist.classList.toggle('open');
        };
    } else {
        console.log('Menu or navlist not found');
    }
});

//API
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c1b8029510e8364c754629";

    // Login Button
    var loginBtn = document.getElementById('contact-submit');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();

            let contactEmail = document.getElementById("contact-email").value;
            let contactText = document.getElementById("contact-text").value;

            let settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
            };

            fetch("https://fedasg2-d40c.restdb.io/rest/membership", settings)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const matchingUser = data.find(user => user.email === contactEmail && user.password === contactText);
                    if (matchingUser) {
                        sessionStorage.setItem('userName', matchingUser.name); // Store the user's name in sessionStorage
                        window.location.href = "index.html";
                    } else {
                        alert('Invalid email or password');
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Login error: ' + error.message);
                });
        });
    } else {
        console.log('Login button not found');
    }

    // Signup Button
    var signUpBtn = document.getElementById('signup-submit');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Retrieve form data
            let signupName = document.getElementById("signup-name").value;
            let signupNumber = document.getElementById("signup-number").value;
            let signupEmail = document.getElementById("signup-email").value;
            let signupPassword = document.getElementById("signup-password").value;

            // Prepare JSON data for the API call
            let jsondata = {
                "name": signupName,
                "number": signupNumber,
                "email": signupEmail,
                "password": signupPassword
            };

            // Define settings for fetch call
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsondata),
            };

            // Make the API call to signup
            fetch("https://fedasg2-d40c.restdb.io/rest/membership", settings) // Ensure this is the correct endpoint
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(response => {
                    console.log('Signup successful', response);
                    alert('Thank you for signing up!');
                    // Clear the form fields after successful signup
                    document.getElementById("signup-name").value = '';
                    document.getElementById("signup-number").value = '';
                    document.getElementById("signup-email").value = '';
                    document.getElementById("signup-password").value = '';
                })
                .catch(error => {
                    console.error('Signup error:', error);
                    alert('Signup error: ' + error.message);
                });
        });
    } else {
        console.log('Signup button not found');
    }


    // Newsletter Button
    var signUpBtn = document.getElementById('newsletter-submit');
    signUpBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('button clicked');

        let newsEmail = document.getElementById("newsletter-email").value;

        if (newsEmail.trim() === "") {
            alert("Please enter your email address.");
            return; // Stop further execution if email is empty
        }

        let jsondata = {
            "email": newsEmail,
        };

        let settings = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
        };

        fetch("https://fedasg2-d40c.restdb.io/rest/newsletter", settings)
        .then(response => response.json())
        .then(response => {
            console.log('Sending...', response);
            alert('Thank you for signing up!');
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

// Function to update header based on user login status
function updateUserDisplay(userName) {
    const loginBtn = document.getElementById('login-btn');
    const userNameDisplay = document.getElementById('user-name');

    if (userName) {
        loginBtn.classList.add('hidden');
        userNameDisplay.classList.remove('hidden');
        userNameDisplay.textContent = `Welcome, ${userName}`; // Set the user's name
    } else {
        loginBtn.classList.remove('hidden');
        userNameDisplay.classList.add('hidden');
    }
}

// Check if the user is already logged in
function updateUserDisplay() {
    const loginBtn = document.getElementById('login-btn');
    const userNameDisplay = document.getElementById('user-name');
    const userName = sessionStorage.getItem('userName'); // Get the user's name from sessionStorage

    if (userName) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userNameDisplay) {
            userNameDisplay.classList.remove('hidden');
            userNameDisplay.textContent = `Welcome, ${userName}`; // Update the display with the user's name
            userNameDisplay.classList.add('welcome-text'); 
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.classList.add('hidden');
    }
}

updateUserDisplay();

var headerLoginBtn = document.getElementById('login-btn');
if (headerLoginBtn) {
    headerLoginBtn.addEventListener('click', function () {
        window.location.href = "login.html";
    });
}


// Initialize an empty cart array
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    alert('Item added to cart!');
    console.log('Cart:', cart);
}

function viewCart() {
    const cartDisplay = document.getElementById('cart-display');
    if (cartDisplay) {
        if (cart.length === 0) {
            alert('Cart is empty!');
        } else {
            alert(`Cart Contents:\n${cart.join('\n')}`);
        }
    }
}

function checkCart() {
    if (cart.length === 0) {
        alert('Cart is empty. Please add items before proceeding to checkout.');
        // Prevent the default behavior of the link (going to checkout.html)
        event.preventDefault();
    }
}

