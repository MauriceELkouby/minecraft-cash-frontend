import { get, post } from "./api.js";

const token = localStorage.getItem("token");

async function load() {
  const data = await get("balance", token);
  document.getElementById("cash").innerText = "Cash: $" + data.cash;
  username.textContent = data.name;
  const list = document.getElementById("inventory");
  list.innerHTML = "";
  data.minerals.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.qty}`;
    list.appendChild(li);
  });
}

window.trade = async function() {
  const mineral = document.getElementById("mineral").value;
  const qty = parseInt(document.getElementById("qty").value);
  const direction = document.getElementById("direction").value;

  const res = await post("trade", { mineral, qty, direction }, token);
  if (res.error) {
    alert(res.error);
  } else {
    alert("Trade successful! New cash: $" + res.cash);
    load();
  }
};
window.transfer = async function() {
  const recipientEmail = document.getElementById("player").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!recipientEmail || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid email and amount.");
    return;
  }

  const res = await post("transfer", { recipientEmail, amount }, token);

  if (res.error) {
    alert("Transfer failed: " + res.error);
  } else {
    alert("Transfer successful!");
    load(); // reload balance
  }
};
load();
