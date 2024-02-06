// API
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c1b8029510e8364c754629";

    // Login Button
    var loginBtn = document.getElementById('contact-submit');
    if (loginBtn) { // Check if the login button exists
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Button clicked!');

            //Retrieve form data
            let contactEmail = document.getElementById("contact-email").value;
            let contactText = document.getElementById("contact-text").value;

            // Define settings for fetch call
            let settings = {
                method: "GET", // Ideally should be POST for login
                headers: {
                  "Content-Type": "application/json",
                  "x-apikey": APIKEY,
                  "Cache-Control": "no-cache"
                },
            };

            fetch("https://fedasg2-d40c.restdb.io/rest/membership", settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched successfully');
                const matchingUser = data.find(user => user.email === contactEmail && user.password === contactText);

                if (matchingUser) {
                    console.log('Login successful');
                    // Ideally, redirect or handle login success scenario here
                    window.location.href = "profile.html";
                } else {
                    console.log('Invalid email or password');
                    // Handle login failure scenario here
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                // Handle errors here
            });
        });
    } else {
        console.log('Login button not found');
    }
});
