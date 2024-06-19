

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

document.querySelector('.view-button').addEventListener('click', function() {
    const articleContent = document.getElementById('articleContent').value;

    // Store the value in the sessionStorage
    sessionStorage.setItem('articleContent', articleContent);

    // Redirect to the viewArticle page
    window.location.href = '/viewArticle';
})

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

// Mahhad's script to save article text into session storage
document.querySelector('.save-button').addEventListener('click', function() {
    var title = document.querySelector('.title-input').value;
    var body = document.querySelector('.body-input').value;
    sessionStorage.setItem('articleTitle', title);
    sessionStorage.setItem('articleBody', body);
});

// Mahhad's script to retrieve save data from session storage and display on view page
window.onload = function() {
    var title = sessionStorage.getItem('articleTitle');
    var body = sessionStorage.getItem('articleBody');
    document.getElementById('articleTitle').textContent = title;
    document.getElementById('articleBody').textContent = body;
};