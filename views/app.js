"use strict";
exports.__esModule = true;
var express = require("express");
var path = require('path');
var app = express();
var PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname + '../src')));
app.get('/', function (req, res) {
    var buyPrice = 100; // Replace with actual buy price
    var sellPrice = 200; // Replace with actual sell price
    res.render('index', { buyPrice: buyPrice, sellPrice: sellPrice });
});
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
