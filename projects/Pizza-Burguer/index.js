import menuArray from "./data.js";

const center = document.getElementById("center");

let orderList = [];

// button clicks handler
function main() {
  const addBtns = document.querySelectorAll(".add-btn");
  const removeBtns = document.querySelectorAll(".remove-btn");
  const completeBtn = document.getElementById("complete-btn");
  const payBtn = document.getElementById("pay-btn");
  const form = document.getElementById("form");

  // add buttons functions
  addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", (e) => {
      const itemId = e.currentTarget.dataset.itemId;
      addItemsToOrder(itemId);
      renderOrderItems();
      renderOrderMenu();
      renderTotalPrice();
    });
  });

  // remove buttons functions
  removeBtns.forEach((remove) => {
    remove.addEventListener("click", (e) => {
      const itemId = e.currentTarget.dataset.itemId;
      removeItemsOfOrder(itemId);
      renderTotalPrice();
      renderOrderItems();
      renderOrderMenu();
    });
  });

  // complete order btn functions
  completeBtn.addEventListener("click", () => {
    document.getElementById("form-div").style.display = "block";
  });

  // pay btn functions
  payBtn.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
      return;
    }
    e.preventDefault();
    document.getElementById("form-div").style.display = "none";
    orderComplete();
    disableBtns(addBtns);
    resetPage();
  });
}

// reset the page after payment
function resetPage() {
  setTimeout(() => {
    location.reload();
  }, 3000);
}
// disable btns after payment
function disableBtns(btn) {
  btn.forEach((disabledBtn) => {
    disabledBtn.disabled = true;
  });
}

// Display a message after the payment
function orderComplete() {
  const clientData = new FormData(form);
  const orderContainer = document.getElementById("order-container");

  orderContainer.innerHTML = `
    <h3 class="finalMessage orderAnimate" id="finalMessage">
      Thanks, ${clientData.get("client")}! Your order is on its way!
    </h3>`;
}

// render the order menu after a item was added
function renderOrderMenu() {
  const orderContainer = document.getElementById("order-container");
  if (orderList.length !== 0) {
    orderContainer.style.display = "flex";
    orderContainer.classList.add("orderAnimate");
  } else {
    orderContainer.style.display = "none";
  }
}

// render the selected items in the order menu
function renderOrderItems() {
  const order = document.getElementById("items");
  order.innerHTML = feedOrderHTML(getList());
  main(); //  Add the event listeners in the remove btns every time that a new item was added in the list
}

// render the total price
function renderTotalPrice() {
  sumOrderTotal(getList());
  const orderTotal = document.getElementById("order-total");
  orderTotal.innerHTML = `
  <h3>Total Price</h3>
  <p>$${sumOrderTotal(getList())}</p>`;
}

/**
 * coloca outra descricao aqui se quiser
 * @return number total price of the order
 */
function sumOrderTotal(arr) {
  let total = 0;

  if (orderList.length > 0) {
    total = arr.reduce((total, current) => {
      return total + current.price;
    }, 0);
  }
  // console.log(total);
  return total;
}

// add the item Object that corresponds with the id list to the array
function addItemsToOrder(itemId) {
  if (!orderList.includes(itemId)) {
    orderList.push(itemId);
  }
}
// return the orderList array without the selected item
function removeItemsOfOrder(itemId) {
  orderList = orderList.filter((item) => {
    return item !== itemId;
  });
  console.log(orderList);
}

// return a list with the id of the selected items
function getList() {
  const itemsOnOrder = [];
  orderList.forEach((id) => {
    menuArray.forEach((menuItem) => {
      if (menuItem.id.toString().includes(id)) {
        itemsOnOrder.push(menuItem);
      }
    });
  });
  return itemsOnOrder;
}
// return a string with the order items HTML
function feedOrderHTML(arr) {
  let orderHTML = "";
  arr.forEach((item) => {
    orderHTML += `
      <div class="order-item">
          <div class="order-info">
              <h3>${item.name}</h3>
              <p class="remove-btn" id="remove-btn" data-item-id="${item.id}">remove</p>
          </div>                                        
          <p>$${item.price}</p>
      </div>
    `;
  });
  return orderHTML;
}
// return a string with the menu items HTML
function feedMenuHTML() {
  let menuHtml = "";
  menuArray.forEach((menuItem) => {
    menuHtml += `
    <div class="menu-item">
      <div class="menu-info">
        <p class="menu-icon" alt="pizza icon">${menuItem.emoji}</p>
        <div>
          <h3 class="item-name">${menuItem.name}</h3>
          <p class="item-ing">${menuItem.ingredients}</p>
          <p class="item-price">$${menuItem.price}</p>
        </div>
      </div>
      <button class="add-btn" data-item-id="${menuItem.id}">
        <span class="material-symbols-outlined">add</span>
      </button>
    </div>
  `;
  });
  return menuHtml;
}
// render the menu items at the start
document.addEventListener("DOMContentLoaded", () => {
  center.innerHTML += feedMenuHTML();
  main();
});
