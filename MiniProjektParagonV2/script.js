let receiptItems = [];


async function fetchReceiptItems() {
    const response = await fetch('http://localhost:3000/receiptItems');
    const data = await response.json();
    receiptItems = data;
    renderReceipt();
}


async function saveReceiptItem(item) {
    const response = await fetch('http://localhost:3000/receiptItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const newItem = await response.json();
    receiptItems.push(newItem);
    renderReceipt();
}


async function updateReceiptItem(item, id) {
    const response = await fetch(`http://localhost:3000/receiptItems/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const updatedItem = await response.json();
    const index = receiptItems.findIndex(i => i.id === id);
    receiptItems[index] = updatedItem;
    renderReceipt();
}


async function deleteReceiptItem(id) {
    const response = await fetch(`http://localhost:3000/receiptItems/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        receiptItems = receiptItems.filter(item => item.id !== id);
        renderReceipt();
    }
}


function renderReceipt() {
    const receiptBody = document.getElementById('receiptBody');
    receiptBody.innerHTML = '';

    let totalSum = 0;

    receiptItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const totalPrice = item.price * item.quantity;


        totalSum += totalPrice;

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity.toFixed(2)}</td>
        <td>${item.price.toFixed(2)} zł</td>
        <td>${totalPrice.toFixed(2)} zł</td>
        <td>
            <button class="edit-button" onclick="editItem('${item.id}')"></button>
          <button class="delete-button" onclick="deleteItem('${item.id}')"></button>
        </td>
      `;
        receiptBody.appendChild(row);
    });


    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
       <td colspan="3"></td>
      <td style="font-weight: bold; text-align: left;">RAZEM:</td>
      <td style="font-weight: bold; text-align: center;">${totalSum.toFixed(2)} zł</td>
      <td></td>
    `;
    receiptBody.appendChild(totalRow);
}


window.onload = () => {
    fetchReceiptItems();
};


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
    const quantity = parseFloat(itemQuantity.value);
    const errorMessage = document.getElementById('error-message');

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';


    if (name === '') {
        errorMessage.textContent = 'Nazwa produktu nie może być pusta.';
        errorMessage.style.display = 'block';
        return;
    }


    if (isNaN(price) || price.toFixed(2) <= 0) {
        errorMessage.textContent = 'Cena jednostkowa musi być liczbą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }


    if (isNaN(quantity) || quantity.toFixed(2) <= 0) {
        errorMessage.textContent = 'Ilość musi być liczbą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }

    const item = { name, price, quantity };

    if (editingIndex !== null) {
        updateReceiptItem(item, editingIndex);
    } else {
        saveReceiptItem(item);
    }

    itemDialog.close();
};

document.getElementById('resetButton').onclick = () => {
    itemDialog.close();
};


function editItem(id) {
    const item = receiptItems.find(item => item.id === id);

    editingIndex = item.id;
    itemName.value = item.name;
    itemPrice.value = item.price;
    itemQuantity.value = item.quantity;

    itemDialog.showModal();
}


function deleteItem(id) {
    if (confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
        deleteReceiptItem(id);
    }
}
