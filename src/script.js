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

