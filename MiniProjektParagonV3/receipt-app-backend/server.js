// Importujemy Express
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware do parsowania JSON
app.use(cors());
app.use(express.json());

let currentId = 3;
// Pamięć dla pozycji paragonu (zamiast bazy danych)
let receiptItems = [
  { id: 1, name: 'Produkt 1', price: 10.0, quantity: 2 },
  { id: 2, name: 'Produkt 2', price: 20.0, quantity: 1 }
];

// GET: Pobranie wszystkich pozycji paragonu
app.get('/receiptItems', (req, res) => {
  res.json(receiptItems);
});

// POST: Dodanie nowej pozycji paragonu
app.post('/receiptItems', (req, res) => {
  const { name, price, quantity } = req.body;

  // Tworzymy nowy obiekt pozycji
  const newItem = {
    id: currentId++,  // W tym przypadku generujemy id na podstawie długości tablicy
    name,
    price,
    quantity
  };

  receiptItems.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Aktualizowanie pozycji paragonu
app.put('/receiptItems/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  // Znajdź przedmiot po id
  const index = receiptItems.findIndex(item => item.id == id);
  if (index === -1) return res.status(404).send('Item not found');

  // Zaktualizuj dane
  receiptItems[index] = { id: parseInt(id), name, price, quantity };
  res.json(receiptItems[index]);
});

// DELETE: Usunięcie pozycji paragonu
app.delete('/receiptItems/:id', (req, res) => {
  const { id } = req.params;

  // Znajdź przedmiot po id
  const index = receiptItems.findIndex(item => item.id == id);
  if (index === -1) return res.status(404).send('Item not found');

  // Usuń przedmiot z tablicy
  receiptItems.splice(index, 1);
  res.status(204).send();
});

// Uruchamiamy serwer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
