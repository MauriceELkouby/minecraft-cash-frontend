import { post } from "./api.js";

async function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const res = await post("register", { name, email, password });
  if (res.token) {
    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } else {
    alert(res.error || "Registration failed");
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await post("login", { email, password });
  if (res.token) {
    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } else {
    alert(res.error || "Login failed");
  }
}

// ✅ Attach events after DOM is ready
document.getElementById("login-btn").addEventListener("click", login);
document.getElementById('register-btn').addEventListener('click', register);
