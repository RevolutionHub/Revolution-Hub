document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    // Toggle the 'active' class on the nav menu to open/close it
    navMenu.classList.toggle('active');

    // Change the icon based on whether the menu is active or not
    if (navMenu.classList.contains('active')) {
        // Change to close icon (✖) when the menu is open
        menuToggle.innerHTML = '&#10006;'; // X icon
    } else {
        // Change back to hamburger icon (☰) when the menu is closed
        menuToggle.innerHTML = '&#9776;'; // Hamburger icon
    }
});



//toggle for about our website development steps

document.querySelectorAll('.step').forEach(function(step, index) {
    const content = step.querySelector('.content');
    const button = step.querySelector('.toggle-btn');

    // Open the first content section by default
    if (index === 0) {
        content.style.display = 'block';
        button.textContent = '-';
    } else {
        content.style.display = 'none';
        button.textContent = '+';
    }

    button.addEventListener('click', function() {
        if (content.style.display === 'block') {
            content.style.display = 'none';
            button.textContent = '+';
        } else {
            // Close all other steps
            document.querySelectorAll('.step .content').forEach(function(otherContent) {
                otherContent.style.display = 'none';
            });
            document.querySelectorAll('.step .toggle-btn').forEach(function(otherButton) {
                otherButton.textContent = '+';
            });

            // Open the clicked step
            content.style.display = 'block';
            button.textContent = '-';
        }
    });
});


//change sentence on home page
const sentences = [
    "Turning your vision into a digital reality.",
    "Shaping the future of your digital presence.",
    "Creative solutions, visionary design.",
    "Where innovation and creativity converge."
];

let index = 0;
const heading = document.getElementById('animated-heading');

function changeSentence() {
    heading.textContent = sentences[index];
    index = (index + 1) % sentences.length;
}

setInterval(changeSentence, 3000); // Change sentence every 10 seconds



// quote page javascript
document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.quote-us-form-step');
    const nextButtons = document.querySelectorAll('.quote-us-next-button');
    const backButtons = document.querySelectorAll('.quote-us-back-button');

    let currentStep = 0;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            steps[currentStep].classList.remove('active');
            currentStep = (currentStep + 1) % steps.length;
            steps[currentStep].classList.add('active');
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            steps[currentStep].classList.remove('active');
            currentStep = (currentStep - 1 + steps.length) % steps.length;
            steps[currentStep].classList.add('active');
        });
    });
});

// Quote form on submit event
document.getElementById('quoteUsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();

    // Basic NZ mobile validation: starts with 021/022/027/028/029 or +64 equivalents
    const phoneRegex = /^(\+?64|0)?2\d{7,9}$/;

    if (!phoneRegex.test(phoneValue)) {
        alert("Please enter a valid New Zealand mobile number.");
        phoneInput.focus();
        return; // Stop submission
    }

    const formData = new FormData(this); // Collect form data

    // Send the form data to Google Apps Script using AJAX
    fetch('https://script.google.com/macros/s/AKfycbwZc1zVva83rVwN0RduvL102zDraUyYU077CSjJdMecx-Nf8V-zMBK087KkfVMsf_wP/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display the success message
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('quoteUsForm').reset();

        // Reset to the first step
        const steps = document.querySelectorAll('.quote-us-form-step');
        steps.forEach(step => step.classList.remove('active'));
        steps[0].classList.add('active');

        // Reset step tracker if used elsewhere
        currentStep = 0;
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
});

