
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

let currentId = 3;

let receiptItems = [
  { id: 1, name: 'Produkt 1', price: 10.0, quantity: 2 },
  { id: 2, name: 'Produkt 2', price: 20.0, quantity: 1 }
];


app.get('/receiptItems', (req, res) => {
  res.json(receiptItems);
});


app.post('/receiptItems', (req, res) => {
  const { name, price, quantity } = req.body;

  
  const newItem = {
    id: currentId++,
    name,
    price,
    quantity
  };

  receiptItems.push(newItem);
  res.status(201).json(newItem);
});


app.put('/receiptItems/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  
  const index = receiptItems.findIndex(item => item.id == id);
  if (index === -1) return res.status(404).send('Item not found');

  
  receiptItems[index] = { id: parseInt(id), name, price, quantity };
  res.json(receiptItems[index]);
});


app.delete('/receiptItems/:id', (req, res) => {
  const { id } = req.params;

  
  const index = receiptItems.findIndex(item => item.id == id);
  if (index === -1) return res.status(404).send('Item not found');

  
  receiptItems.splice(index, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
