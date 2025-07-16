import { post } from "./api.js";

window.register = async function() {
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
};

window.login = async function() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await post("login", { email, password });
  if (res.token) {
    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } else {
    alert(res.error || "Login failed");
  }
};
