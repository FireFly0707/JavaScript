let receiptItems = JSON.parse(localStorage.getItem('receiptItems')) || [];

function saveToLocalStorage() {
    localStorage.setItem('receiptItems', JSON.stringify(receiptItems));
}

function renderReceipt() {
    const receiptBody = document.getElementById('receiptBody');
    receiptBody.innerHTML = '';

    receiptItems.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button onclick="editItem(${index})">Edytuj</button>
          <button onclick="deleteItem(${index})">Usuń</button>
        </td>
      `;
        receiptBody.appendChild(row);
    });
}
const itemDialog = document.getElementById('itemDialog');
const itemName = document.getElementById('itemName');
const itemPrice = document.getElementById('itemPrice');
const itemQuantity = document.getElementById('itemQuantity');

let editingIndex = null;

document.getElementById('addItemButton').onclick = () => {
    editingIndex = null;
    itemName.value = '';
    itemPrice.value = '';
    itemQuantity.value = '';
    itemDialog.showModal();
};

document.getElementById('confirmButton').onclick = () => {
    const name = itemName.value;
    const price = parseFloat(itemPrice.value);
    const quantity = parseInt(itemQuantity.value);

    if (editingIndex !== null) {
        // Edytowanie istniejącej pozycji
        receiptItems[editingIndex] = { name, price, quantity };
    } else {
        // Dodawanie nowej pozycji
        receiptItems.push({ name, price, quantity });
    }

    saveToLocalStorage();
    renderReceipt();
    itemDialog.close();
};
ocument.getElementById('resetButton').onclick = () => {
   
    itemDialog.close();
};
function editItem(index) {
    editingIndex = index;
    const item = receiptItems[index];

    itemName.value = item.name;
    itemPrice.value = item.price;
    itemQuantity.value = item.quantity;

    itemDialog.showModal();
}
function deleteItem(index) {
    if (confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
        receiptItems.splice(index, 1);
        saveToLocalStorage();
        renderReceipt();
    }
}
window.onload = () => {
    renderReceipt();
};