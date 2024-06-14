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
