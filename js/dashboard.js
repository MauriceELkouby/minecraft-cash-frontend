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
  loadTradeFeed();
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

async function loadTradeFeed() {
  const data = await get("trade-feed", token);

  const offersList = document.getElementById("offers-received");
  offersList.innerHTML = "";

  data.offersReceived.forEach(offer => {
    const li = document.createElement("li");
    li.textContent = `${offer.senderEmail} wants to trade ${offer.qty} ${offer.mineral} for $${offer.price} `;

    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = "Accept";
    acceptBtn.onclick = () => acceptTrade(offer.id);

    li.appendChild(acceptBtn);
    offersList.appendChild(li);
  });

  const acceptedList = document.getElementById("trades-accepted");
  acceptedList.innerHTML = "";

  data.acceptedTrades.forEach(trade => {
    const li = document.createElement("li");
    li.textContent = `${trade.senderEmail} gave ${trade.qty} ${trade.mineral} to ${trade.recipientEmail} for $${trade.price}`;
    acceptedList.appendChild(li);
  });
}

async function acceptTrade(offerId) {
  const res = await post("trade-accept", { offerId }, token);

  if (res.error) {
    alert("Failed to accept: " + res.error);
  } else {
    alert("Trade accepted!");
    load();          // refresh balance
  }
}


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
