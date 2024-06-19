document.addEventListener("DOMContentLoaded", () => {
    const rmCheck = document.getElementById("rememberMe"),
        passInput = document.getElementById("password"),
        userInput = document.getElementById("username");

    if (localStorage.checkbox && localStorage.checkbox !== "") {
        rmCheck.setAttribute("checked", "checked");
        passInput.value = localStorage.password;
        userInput.value = localStorage.username;
    } else {
        rmCheck.removeAttribute("checked");
        passInput.value = "";
        userInput.value = "";
    }

    rmCheck.addEventListener("change", rememberMe);
    userInput.addEventListener("change", rememberMe);
    passInput.addEventListener("change", rememberMe);

    function rememberMe() {
        if (rmCheck.checked && userInput.value !== "" && passInput.value !== "") {
            localStorage.username = userInput.value;
            localStorage.password = passInput.value;
            localStorage.checkbox = rmCheck.value;
        } else {
            localStorage.username = "";
            localStorage.password = "";
            localStorage.checkbox = "";
        }
    }
});

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
    const articleTitle = document.getElementById('articleContent').value;
            const articleBody = document.querySelector('.content-box .content.active .body-input').value;

    // Store the values in the sessionStorage
    sessionStorage.setItem('articleTitle', articleTitle);
            sessionStorage.setItem('articleBody', articleBody);

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

//Mahhad's view article script
window.onload = function() {
    const articleContent = sessionStorage.getItem('articleContent');

    document.getElementById('articleTitle').innerText = content.title;
    document.getElementById('articleBody').innerText = content.body;
};

