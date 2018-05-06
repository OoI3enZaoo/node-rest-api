const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 1) {
        return res.status(500).json({
          error: 'error'
        })
      } else {
        bcrypt.hash(req.body.email, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: 'error'
            })
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: 'user has been created'
                })
              })
              .catch(error => {
                res.status(500).json({
                  error: error
                })
              })
          }
        });
      }
    })
}

exports.user_login = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1 ) {
        return res.status(401).json({
          error: 'email not found'
        })
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.stats(401).json({
              error: err
            })
          }
          if (result) {
            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            }, process.env.JWT_KEY)
            return res.status(200).json({
              message: 'auth successful',
              token: token
            })
          } else {
            res.status(401).json({
              message: 'auth failed'
            })
          }
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    })
}
