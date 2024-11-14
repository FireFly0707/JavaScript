let receiptItems = JSON.parse(localStorage.getItem('receiptItems')) || [];

function saveToLocalStorage() {
    localStorage.setItem('receiptItems', JSON.stringify(receiptItems));
}

function renderReceipt() {
    const receiptBody = document.getElementById('receiptBody');
    receiptBody.innerHTML = '';

    let totalSum = 0;

    receiptItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const totalPrice = item.price * item.quantity;

        // Dodajemy do całkowitej sumy dla każdego elementu
        totalSum += totalPrice;

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)} zł</td>
        <td>${totalPrice.toFixed(2)} zł</td>
        <td>
           <button class="edit-button" onclick="editItem(${index})"></button>
          <button class="delete-button" onclick="deleteItem(${index})"></button>
        </td>
      `;
        receiptBody.appendChild(row);
    });

    // Dodanie wiersza z ceną całkowitą pod kolumną "Cena łączna"
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
       <td colspan="3"></td>
      <td style="font-weight: bold; text-align: left;">RAZEM:</td>
      <td style="font-weight: bold; text-align: center;">${totalSum.toFixed(2)} zł</td>
      <td></td>
    `;
    receiptBody.appendChild(totalRow);
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
    const name = itemName.value.trim();
    const price = parseFloat(itemPrice.value);
    const quantity = parseInt(itemQuantity.value);
    const errorMessage = document.getElementById('error-message');

   
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    
    if (name === '') {
        errorMessage.textContent = 'Nazwa produktu nie może być pusta.';
        errorMessage.style.display = 'block';
        return; 
    }

    if (isNaN(price) || price <= 0) {
        errorMessage.textContent = 'Cena jednostkowa musi być liczbą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        errorMessage.textContent = 'Ilość musi być liczbą całkowitą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }

   
    if (editingIndex !== null) {
       
        receiptItems[editingIndex] = { name, price, quantity };
    } else {
       
        receiptItems.push({ name, price, quantity });
    }

    saveToLocalStorage();  
    renderReceipt();       
    itemDialog.close();    
};
document.getElementById('resetButton').onclick = () => {

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