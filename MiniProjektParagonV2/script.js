let receiptItems = [];  // Puste na początku, dane będą pobierane z serwera

// Funkcja do pobierania danych z backendu
async function fetchReceiptItems() {
    const response = await fetch('http://localhost:3000/receiptItems');
    const data = await response.json();
    receiptItems = data;
    renderReceipt();
}

// Funkcja do zapisywania danych na serwerze
async function saveReceiptItem(item) {
    const response = await fetch('http://localhost:3000/receiptItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const newItem = await response.json(); // Serwer zwróci item z przypisanym id
    receiptItems.push(newItem);
    renderReceipt();
}

// Funkcja do aktualizowania pozycji na serwerze
async function updateReceiptItem(item, id) {
    const response = await fetch(`http://localhost:3000/receiptItems/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const updatedItem = await response.json(); // Zaktualizowany przedmiot
    const index = receiptItems.findIndex(i => i.id === id);
    receiptItems[index] = updatedItem;
    renderReceipt();
}

// Funkcja do usuwania pozycji z serwera
async function deleteReceiptItem(id) {
    const response = await fetch(`http://localhost:3000/receiptItems/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        receiptItems = receiptItems.filter(item => item.id !== id);
        renderReceipt();
    }
}

// Funkcja renderująca paragon
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

// Wywołanie funkcji fetch przy załadowaniu strony
window.onload = () => {
    fetchReceiptItems();
};

// Dodawanie nowej pozycji
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

    // Walidacja nazwy
    if (name === '') {
        errorMessage.textContent = 'Nazwa produktu nie może być pusta.';
        errorMessage.style.display = 'block';
        return;
    }

    // Walidacja ceny
    if (isNaN(price) || price.toFixed(2) <= 0) {
        errorMessage.textContent = 'Cena jednostkowa musi być liczbą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }

    // Walidacja ilości
    if (isNaN(quantity) || quantity.toFixed(2) <= 0) {
        errorMessage.textContent = 'Ilość musi być liczbą większą od 0.';
        errorMessage.style.display = 'block';
        return;
    }

    const item = { name, price, quantity };

    if (editingIndex !== null) {
        updateReceiptItem(item, editingIndex); // Przekazujemy id, aby edytować przedmiot
    } else {
        saveReceiptItem(item); // Dodajemy nowy przedmiot
    }

    itemDialog.close();
};

document.getElementById('resetButton').onclick = () => {
    itemDialog.close();
};

// Edycja pozycji
function editItem(id) {
    const item = receiptItems.find(item => item.id === id);

    editingIndex = item.id;
    itemName.value = item.name;
    itemPrice.value = item.price;
    itemQuantity.value = item.quantity;

    itemDialog.showModal();
}

// Usuwanie pozycji
function deleteItem(id) {
    if (confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
        deleteReceiptItem(id); // Przekazujemy id do usunięcia
    }
}
