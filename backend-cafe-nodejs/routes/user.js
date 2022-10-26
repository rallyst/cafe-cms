const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


router.post('/signup', (req, res) => {
  let user = req.body;
  query = 'select email, password, role, status from user where email=?'
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query = "insert into user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')"
        connection.query(query,[user.name, user.contactNumber, user.email, user.password], (err, results) => {
          if (!err) {
            return res.status(200).json({message: 'Successfully Registered'});
          } else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({message: 'Email already exist'})
      }
    } else {
      return res.status(500).json(err)
    }
  })
})

router.post('/login', (req, res) => {
  const user = req.body;
  query = 'select email, password, role, status from user where email=?';
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({message: 'Incorrect Username or Password'});
      } else if (results[0].status === 'false') {
        return res.status(401).json({message: 'Wait for Admin Approval'});
      } else if (results[0].password == user.password) {
        const response = { email: results[0].email, role: results[0].role }
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'})
        res.status(200).json({token: accessToken})
      } else {
        return res.status(400).json({message: 'Something went wrong. Please try again later'});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

router.post('/forgotpassword', (req, res))

module.exports = router;