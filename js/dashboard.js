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

window.sendTrade = async function() {
  const recipientEmail = document.getElementById("trade-recipient").value;
  const mineral = document.getElementById("trade-mineral").value;
  const qty = parseInt(document.getElementById("trade-qty").value);
  const price = parseFloat(document.getElementById("trade-price").value);

  if (!recipientEmail || !mineral || isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) {
    alert("Invalid trade inputs.");
    return;
  }

  const res = await post("trade-offer", { recipientEmail, mineral, qty, price }, token);
  if (res.error) {
    alert("Failed to send offer: " + res.error);
  } else {
    alert("Trade offer sent!");
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
