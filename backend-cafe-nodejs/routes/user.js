const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');


router.post('/signup', (req, res) => {
  let user = req.body;
  let query = 'select email, password, role, status from user where email=?'
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let query = "insert into user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')"
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
  let query = 'select email, password, role, status from user where email=?';
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      console.log(results)
      console.log(user)
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
  host: 'smtp.ukr.net',
  port: 465,
  // logger: true,
  // debug: true,
  tls:{
    rejectUnAuthorized: true
  },
  secureConnection: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

router.post('/forgotPassword', (req, res) => {
  const user = req.body;
  let query = 'select email, password from user where email=?';
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if(results.length <= 0 ) {
        return res.status(200).json({message: 'Password sent successfully to your email'});
      } else {
        let mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: 'Password by Cafe Management System',
          html: '<p><b>Your Login details for Cafe Management System</b><br><b>Email: </b>'
            + results[0].email
            + '<br><b>Password: </b>'
            + results[0].password
            + '<br><a href="http://localhost:4200/">Click here to login</a></p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
        return res.status(200).json({message: 'Password sent successfully to your email'});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})

router.get('/get', auth.authenticateToken, (req, res) => {
  let query = 'select id, name, email, contactNumber, status from user where role = "user"';
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.patch('/update', auth.authenticateToken, (req, res) => {
  let user = req.body;
  let query = 'update user set status=? where id=?';
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({message: 'User id does not exist'});
      }

      return res.status(200).json({message: 'User Updated Successfully'});
    } else {
      return res.status(500).json(err);
    }
  })
})

router.get('/checkToken', auth.authenticateToken, (req, res) => {
  return res.status(200).json({message: 'true'});
})

router.post('/changePassword', (req, res) => {
  // const
})

module.exports = router;