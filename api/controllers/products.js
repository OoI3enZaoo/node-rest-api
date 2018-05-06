const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')

exports.products_get_all = (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        err,
      })
    })
}

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  })
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product was created',
        createProduct: product,
      })
    })
    .catch(err => console.log(err))
}

exports.products_get_product =  (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err})
    })
}

exports.products_update_product =  (req, res, next) => {
  const id = req.params.productId
  res.status(201).json({
    message: 'patch productId: ' + id
  })
}

exports.products_delete = (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        err,
      })
    })
  res.status(201).json({
    message: 'delete productId: ' + id
  })
}
