const express = require('express');
const connection = require('../connection');
const router = express.Router();
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
  let category = req.body;
  let query = 'insert into category (name) values(?)';
  connection.query(query, [category.name], (err, results) => {
    if (!err) {
      return req.status(200).json({message: 'Category Added Successfully'});
    } else {
      return req.status(500).json(err)
    }
  })
})
