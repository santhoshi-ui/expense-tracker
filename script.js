let total = 0;

function addExpense() {
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");

  const name = nameInput.value;
  const amount = Number(amountInput.value);

  if (name === "" || amount === 0) {
    return;
  }

  const list = document.getElementById("expense-list");
  const item = document.createElement("li");
  item.textContent = name + " - ₹" + amount;
  list.appendChild(item);

  total = total + amount;
  document.getElementById("total").textContent = total;

  nameInput.value = "";
  amountInput.value = "";
}