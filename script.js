// [JS] grab references to the form, inputs, and list from the HTML
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");

// [JS] keep a running total of all expenses
let total = 0;

// [JS] create a spot to show the total, and add it to the page
const totalDisplay = document.createElement("h2");
totalDisplay.id = "total-display";
document.body.insertBefore(totalDisplay, expenseList);

// [JS] updates the total text whenever expenses change
function updateTotal() {
  totalDisplay.textContent = "Total: $" + total.toFixed(2);
}

// [JS] runs every time the form is submitted (button clicked)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // [JS] stops the page from refreshing (default form behavior)

  const desc = descInput.value.trim();      // [JS] get typed description, remove extra spaces
  const amount = parseFloat(amountInput.value); // [JS] convert amount text into a number

  // [JS] basic check: don't add empty or invalid entries
  if (desc === "" || isNaN(amount)) {
    return;
  }

  // [JS] create a new list item for this expense
  const li = document.createElement("li");
  li.textContent = desc + " - $" + amount.toFixed(2);

  // [JS] create a delete button for this expense
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  // [JS] when delete is clicked, remove this item and subtract from total
  deleteBtn.addEventListener("click", function () {
    li.remove();
    total -= amount;
    updateTotal();
  });

  li.appendChild(deleteBtn);
  expenseList.appendChild(li);

  // [JS] update the running total
  total += amount;
  updateTotal();

  // [JS] clear the input boxes for the next entry
  descInput.value = "";
  amountInput.value = "";
  descInput.focus();
});

// [JS] show "Total: $0.00" when the page first loads
updateTotal();