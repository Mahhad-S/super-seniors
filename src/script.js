document.addEventListener("DOMContentLoaded", () => {
    const rmCheck = document.getElementById("rememberMe"),
        passInput = document.getElementById("password"),
        userInput = document.getElementById("username");

    if (rmCheck && localStorage.checkbox && localStorage.checkbox !== "") {
        rmCheck.setAttribute("checked", "checked");
        passInput.value = localStorage.password;
        userInput.value = localStorage.username;
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

    const viewButton = document.querySelector('.view-button');
    if (viewButton) {
        viewButton.addEventListener('click', function() {
            const articleContent = document.querySelector('.article-title input').value;

            // Store the value in the sessionStorage
            sessionStorage.setItem('articleContent', articleContent);

            // Redirect to the viewArticle page
            window.location.href = '/viewArticle';
        });
    }

    const tabs = document.querySelectorAll('.section-button');
    const allContent = document.querySelectorAll('.content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => { tab.classList.remove('active') });
            tab.classList.add('active');

            allContent.forEach(content => { content.classList.remove('active') });
            allContent[index].classList.add('active');
        });
    });
});
