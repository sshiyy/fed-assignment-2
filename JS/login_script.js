// Function to handle form submission
function handleSubmit(formId, actionType) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      // Adding actionType to the data object
      data.action = actionType;

      fetch('https://fedasg2-d40c.restdb.io/rest/membership', {
          method: 'POST', // Use POST to send data
          headers: {
              'Content-Type': 'application/json', // Specify the request's content type
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
          if (data.success) {
              // Handle success, could be login or signup
              console.log(`${actionType} successful:`, data);
          } else {
              // Handle failure, could be login or signup
              console.error(`${actionType} failed:`, data.message);
          }
      })
      .catch(error => {
          // Handle network errors
          console.error(`${actionType} error:`, error);
      });
  });
}

// Initialize form handlers
handleSubmit('loginForm', 'login');
handleSubmit('signupForm', 'signup');
