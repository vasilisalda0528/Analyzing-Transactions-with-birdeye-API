import express = require('express');
import { Request, Response } from 'express';
var path = require ('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '../src')));
app.get('/', (req: Request, res: Response) => {
  const buyPrice = 100; // Replace with actual buy price
  const sellPrice = 200; // Replace with actual sell price
  
  res.render('index', { buyPrice, sellPrice });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
