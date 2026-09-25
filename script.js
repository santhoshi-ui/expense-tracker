// grab references to the form, inputs, and list from the HTML
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-display");

// keep a running total of all expenses
let total = 0;

// updates the total text whenever expenses change
function updateTotal() {
  totalDisplay.textContent = "Total: $" + total.toFixed(2);
}

// runs every time the form is submitted (button clicked)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stops the page from refreshing

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (desc === "" || isNaN(amount)) {
    return;
  }

  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = desc + " - $" + amount.toFixed(2);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    total -= amount;
    updateTotal();
  });

  li.appendChild(textSpan);
  li.appendChild(deleteBtn);
  expenseList.appendChild(li);

  total += amount;
  updateTotal();

  descInput.value = "";
  amountInput.value = "";
  descInput.focus();
});

// show "Total: $0.00" when the page first loads
updateTotal();