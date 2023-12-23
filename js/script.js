const inputSearch = document.getElementById("input-search");
const inputName = document.getElementById("input-name");
const inputPrice = document.getElementById("input-price");
const outputPrice = document.getElementById("output-price");
const itemsList = document.getElementById("items-list");


// Getting saved data
itemsList.innerHTML = localStorage.getItem("items");
updatePrice();


// Autoformatter function (listener)
inputPrice.addEventListener("focusout", function () {
    inputPrice.value = formatPrice(inputPrice.value);
});


// Delete item function (listener) / Function to remove item
itemsList.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentNode.remove();
        updatePrice();
    }

    saveData();
});


inputSearch.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        searchItem();
    }
});


// Formatter function
function formatPrice(text) {
    if (text !== "") {
        text = text.replace(",", ".");
        text = (text.startsWith("$")) ? text : "$" + text;
        text = (text.includes(".")) ? text : text + ".00";
        return text;
    }
    return "";
    
    // Input: 1
    // Output: $1.00
}


// Function to search if an item is in the list
function searchItem() {
    let itemName = inputSearch.value;
    let itemKey = -1;

    if (itemName === "") {
        return;
    }

    itemsList.childNodes.forEach(function(item, key) {
        if (item.getAttribute("item-name").toLowerCase() === itemName.toLowerCase()) {
            itemKey = key;
        }
    });

    if (itemKey != -1) {
        alert("This item is in the position " + (itemKey + 1));
    }
    else {
        alert("This list doesn't have this item!");
    }
}


// Function to add item
function addItem() {
    itemName = inputName.value;
    itemPrice = formatPrice(inputPrice.value);

    // Testing if one of the camps is empty
    if (itemName === "" || itemPrice === "") {
        inputName.value = "";
        inputPrice.value = "";
        return;
    }

    itemPriceNum = parseFloat(itemPrice.slice(1));

    // Testing if itemPrice is NaN
    if (isNaN(itemPriceNum)) {
        alert("Erro: Price doesn't have letters you fool!")
        inputPrice.value = "";
        return;
    }

    // Emptying inputs values
    inputName.value = "";
    inputPrice.value = "";

    // Creating the item LI tag
    let item = document.createElement("li");
    item.innerText = itemName + " - " + itemPrice;
    item.setAttribute("price", itemPriceNum);
    item.setAttribute("item-name", itemName);

    // Creating the close button to the item
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "x";
    item.appendChild(closeBtn);

    // Adding the price to the total price and adding the item to the list
    itemsList.appendChild(item);
    updatePrice();

    saveData();
}


function calcTotalPrice() {
    let totalPrice = 0.00;

    itemsList.childNodes.forEach(function(item) {
        totalPrice += parseFloat(item.getAttribute("price"));
    });

    return totalPrice;
}


function updatePrice() {
    outputPrice.innerText = "Total: " + formatPrice(calcTotalPrice().toFixed(2));
}


function saveData() {
    localStorage.setItem("items", itemsList.innerHTML);
}
