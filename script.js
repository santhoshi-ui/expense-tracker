let totalIncome = 0;
let totalExpense = 0;
let unwantedTotal = 0;

function saveData() {
  const data = {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    unwantedTotal: unwantedTotal,
    historyHTML: document.getElementById("transaction-list").innerHTML
  };
  localStorage.setItem("expenseTrackerData", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("expenseTrackerData");
  if (saved) {
    const data = JSON.parse(saved);
    totalIncome = data.totalIncome;
    totalExpense = data.totalExpense;
    unwantedTotal = data.unwantedTotal;
    document.getElementById("transaction-list").innerHTML = data.historyHTML;
    updateSummary();
  }
}

function addIncome() {
  const nameInput = document.getElementById("income-name");
  const amountInput = document.getElementById("income-amount");

  const name = nameInput.value;
  const amount = Number(amountInput.value);

  if (name === "" || amount === 0) {
    return;
  }

  totalIncome = totalIncome + amount;

  const list = document.getElementById("transaction-list");
  const item = document.createElement("li");
  item.textContent = "+ " + name + " - ₹" + amount;
  item.classList.add("income-item");
  list.appendChild(item);

  updateSummary();
  saveData();

  nameInput.value = "";
  amountInput.value = "";
}

function addExpense() {
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const typeInput = document.getElementById("expense-type");

  const name = nameInput.value;
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (name === "" || amount === 0) {
    return;
  }

  totalExpense = totalExpense + amount;

  if (type === "want") {
    unwantedTotal = unwantedTotal + amount;
  }

  const list = document.getElementById("transaction-list");
  const item = document.createElement("li");
  const label = type === "want" ? " (unwanted)" : "";
  item.textContent = "- " + name + " - ₹" + amount + label;
  item.classList.add("expense-item");
  list.appendChild(item);

  updateSummary();
  saveData();

  nameInput.value = "";
  amountInput.value = "";
}

function updateSummary() {
  const balance = totalIncome - totalExpense;

  document.getElementById("total-income").textContent = "₹" + totalIncome;
  document.getElementById("total-expense").textContent = "₹" + totalExpense;
  document.getElementById("balance").textContent = "₹" + balance;
  document.getElementById("unwanted-total").textContent = "₹" + unwantedTotal;
}

window.onload = loadData;
