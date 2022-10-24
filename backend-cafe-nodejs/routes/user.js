const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/signup', (req, res) => {
  let user = req.body;
  query = 'select email, password, role, status from user where email=?'
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query = "insert into user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')"
      } else {
        return res.status(400).json({message: 'Email already exist'})
      }
    } else {
      return res.status(500).json(err)
    }
  })

})

module.exports = router;