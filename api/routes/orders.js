const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handle GET request to /orders'
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(200).json({
    message: 'Order was created',
    order,
  })
})

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    message: 'get orderId: ' + id
  })
})


router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    message: 'delete orderId: ' + id
  })
})



module.exports = router
