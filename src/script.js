let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
    
        window.addEventListener('scroll', function() {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                navbar.classList.add('navbar-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('navbar-hidden');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
        }, false);

function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    if (username !== 'correctusername' || password !== 'correctpassword') {
        errorMessage.style.display = 'block';
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}

// Check if there's an error message to display
window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var errorParam = urlParams.get('error');
    var errorMessage = document.getElementById('error-message');

    if (errorParam) {
        errorMessage.style.display = 'block';
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.section-button');
    const allContent = document.querySelectorAll('.content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs and content
            tabs.forEach(tab => { tab.classList.remove('active') });
            allContent.forEach(content => { content.classList.remove('active') });

            // Add 'active' class to the clicked tab and corresponding content
            tab.classList.add('active');
            allContent[index].classList.add('active');
        });
    });
});

// Mauricio's search bar
function performSearch() {
    const query = document.getElementById('search-bar').value;
    // Logic to perform search and display results
    document.getElementById('search-results').innerHTML = 'Results for: ' + query;
}


/* ----------------------------------------------------------------------------------------------------------------------------------------  */


/* Quill Text Editor Custom Prototype             -- Don't Erase Will be revisit later on!!!
const quill = new Quill('#editor', {
    modules: {
      toolbar: [
        ['bold', 'italic',],
        ['underline', 'strike', 'link',],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
    theme: 'snow',
  });
*/

/* Quill Text Editor and Functions -- Starts  */

var quill = new Quill('#editor', {
    theme: 'snow'
});

document.getElementById('quillForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the content from Quill editor
    var content = quill.root.innerHTML;
    
    // Set the content to the hidden input field
    document.getElementById('content').value = content;
    
    // Prepare form data
    var formData = new FormData(this);

    // Send the data to the server
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

/* Quill Text Editor and Functions -- Ends  */