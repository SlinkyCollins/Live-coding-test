// ADD BUDGET
const add = () => {
  let expense = document.getElementById("descInput").value;
  let quantity = document.getElementById("inputQuantity").value;
  let amount = document.getElementById("amountInput").value;

  let budgetObj = { expense, quantity, amount };

  if (
    (expense == "" && quantity == "" && amount == "") ||
    (expense !== "" && quantity !== "" && amount == "") ||
    (expense !== "" && quantity == "" && amount !== "") ||
    (expense == "" && quantity !== "" && amount !== "") ||
    (expense !== "" && quantity == "" && amount == "") ||
    (expense == "" && quantity !== "" && amount == "") ||
    (expense == "" && quantity == "" && amount !== "")
  ) {
    document.getElementById("show").innerText = "Baba fill this thing joor😁";
    document.getElementById("show").style.display = "black";
  } else if (quantity <= 0 || amount <= 0) {
    document.getElementById("show").innerText = "Invalid Quantity or Amount";
    document.getElementById("show").style.color = "red";
  } else {
    document.getElementById("descInput").value = "";
    document.getElementById("inputQuantity").value = "";
    document.getElementById("amountInput").value = "";
    let budgetArray = JSON.parse(localStorage.getItem("budget")) || [];
    budgetArray.push(budgetObj);
    localStorage.setItem("budget", JSON.stringify(budgetArray));
    show.innerText = "";
    window.location.href = "./displayBudget.html";
  }
};

// DISPLAY BUDGET
let budgetArray = JSON.parse(localStorage.getItem("budget"));

let result = document.getElementById("result");
let totalPrice = 0;


if (budgetArray && budgetArray.length > 0) {
  display();
} else {
    result.innerHTML+= "No budget available";
}

const deleteBudget = (i) => {
    budgetArray.splice(i, 1);
    result.innerHTML = ``;
    localStorage.setItem("budget", JSON.stringify(budgetArray));
    display();
};

const editBudget = (i) => {
    budgetArray[i]["expense"] = document.getElementById(`descInput-${i}`).value;
    budgetArray[i]["quantity"] = document.getElementById(`inputQuantity-${i}`).value;
    budgetArray[i]["amount"] = document.getElementById(`amountInput-${i}`).value;
    localStorage.setItem("budget", JSON.stringify(budgetArray));
   result.innerHTML = ``;
    totalPrice = 0;
    display();
};


function display () {
  for (i = 0; i < budgetArray.length; i++) {
    let item = budgetArray[i];
    let itemPrice = item.quantity * item.amount;
    totalPrice += itemPrice;
    result.innerHTML += `
    <div class="card" style="width: 18rem; display: inline-block;">
        <div class="card-body">
          <h5 class="card-text">Product: ${item.expense}</h5>
          <h5 class="card-text">Quantity: ${item.quantity} </h5>
          <h5 class="card-text">Price: ${item.amount}  </h5>
          <h5 class="card-text">Total: ${itemPrice} </h5>
          <a href="#" class="btn btn-danger" onclick="deleteBudget(${i})">Delete</a>
          <a href="#" class="btn btn-warning"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal-${i}">Edit</a>
          <!-- Button trigger modal -->


            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">New Edit</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <input type="text" placeholder="Product name" id="descInput-${i}">
              <input type="number"  placeholder="Quantity" id="inputQuantity-${i}">
              <input type="number" placeholder="Price" id="amountInput-${i}">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="editBudget(${i})" data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
             </div>
        </div>
    </div>
        `;
  }
};
