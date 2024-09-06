// Add event listener to the form
document.getElementById('quoteUsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const budget = document.getElementById('budget').value;
    const details = document.getElementById('details').value;

    // Airtable API information
    const airtableApiUrl = "https://api.airtable.com/v0/appV1QMrvr9XUAihA/Revolution Hub Quote";
    const airtableApiKey = "patVqLrxs5r5lcNn5.7690653fb5ce795207743a888b1b60a3bc5d4f42c9eaa47b68bbb930a381eb4f";

    // Create the data object to send to Airtable
    const data = {
        fields: {
            Name: name,
            Email: email,
            Service: service,
            Budget: budget,
            Details: details
        }
    };

    // Send a POST request to Airtable
    fetch(airtableApiUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + airtableApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.id) {
        alert('Quote request submitted successfully!');
		// Reset form fields
            document.getElementById('quoteUsForm').reset();
            
            // Reset to the first step
            const steps = document.querySelectorAll('.quote-us-form-step');
            steps.forEach(step => step.classList.remove('active')); // Hide all steps
            steps[0].classList.add('active'); // Show the first step
            
            // Set current step to the first one
            currentStep = 0;
    } else {
        alert('Failed to submit the form.');
        console.error('Error submitting to Airtable:', data);
    }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
});
