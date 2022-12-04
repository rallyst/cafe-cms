const express = require('express');
const connection = require('../connection');
const router = express.Router();
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let product = req.body;
  let query = "insert into product (name, categoryId, description, price, status) values(?, ?, ?, ?, 'true')"
  connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
    if (!err) {
      return res.status(200).json({message: 'Product Added Successfully.'});
    } else {
      return res.status(500).json(err);
    }
  })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
  let query = "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
  
})