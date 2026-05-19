const tabs = document.querySelectorAll(".auth-tab");
const forms = document.querySelectorAll(".auth-form");
const feedbackElement = document.querySelector(".js-auth-feedback");

const loginForm = document.querySelector(".js-login-form");
const signupForm = document.querySelector(".js-signup-form");

const USERS_KEY = "shopco-users";
const CURRENT_USER_KEY = "shopco-current-user";

function getUsers() {
    const savedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(savedUsers) ? savedUsers : [];
}

function setUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function setFeedback(message, type) {
    if (!feedbackElement) {
        return;
    }

    feedbackElement.textContent = message;
    feedbackElement.classList.remove("error", "success");

    if (type) {
        feedbackElement.classList.add(type);
    }
}

function activatePanel(panelId) {
    tabs.forEach((tab) => {
        const isActive = tab.dataset.panel === panelId;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });

    forms.forEach((form) => {
        form.classList.toggle("active", form.id === panelId);
    });

    setFeedback("", "");
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        if (!tab.dataset.panel) {
            return;
        }

        activatePanel(tab.dataset.panel);
    });
});

if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "");
        const confirmPassword = String(formData.get("confirmPassword") || "");

        if (!name || !email || !password || !confirmPassword) {
            setFeedback("Please fill out all fields.", "error");
            return;
        }

        if (password !== confirmPassword) {
            setFeedback("Passwords do not match.", "error");
            return;
        }

        const users = getUsers();
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            setFeedback("An account with this email already exists.", "error");
            return;
        }

        users.push({
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        });

        setUsers(users);
        setFeedback("Account created. You can now log in.", "success");
        signupForm.reset();
        activatePanel("login-panel");
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "");

        if (!email || !password) {
            setFeedback("Please provide email and password.", "error");
            return;
        }

        const users = getUsers();
        const matchedUser = users.find((user) => user.email === email && user.password === password);

        if (!matchedUser) {
            setFeedback("Invalid email or password.", "error");
            return;
        }

        setCurrentUser({
            name: matchedUser.name,
            email: matchedUser.email,
            loggedInAt: new Date().toISOString()
        });

        setFeedback("Login successful. Redirecting to homepage...", "success");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 700);
    });
}
