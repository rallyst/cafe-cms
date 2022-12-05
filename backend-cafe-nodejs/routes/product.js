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
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  let query = 'SELECT id, name FROM product WHERE categoryId= ? AND status="true"';
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  let query = 'SELECT id, name, description, price FROM product WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
  let product = req.body;
  let query = 'UPDATE product SET name=?, categoryId=?, description=?, price=? WHERE id = ?';
  connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
    if (!err) {
      if(results.affectedRows === 0) {
        return res.status(404).json({message: 'Product id does not found'});
      }

      return res.status(200).json({message: 'Product Updated successfully'});
    } else {
      return res.status(500).json(err);
    }
  })
})

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
  const id = req.params.id;
  let query = 'DELETE FROM product WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({message: 'Product id does not found'});
      }
      return res.status(200).json({message: 'Product deleted successfully'});
    } else {
      return res.status(500).json(err);
    }
  })
})

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
  let user = req.body;
  let query = 'UPDATE product SET status=? WHERE id=?';
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({message: 'Product does not found'});
      }
      return res.status(200).json({message: 'Product status updated successfully'});
    } else {
      return res.status(500).json(err);
    }
  })
})

module.exports = router;