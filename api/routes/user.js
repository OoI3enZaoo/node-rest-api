const mongoose = require("mongoose");
const User = require("../models/user");
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user')

router.post('/sign_up', UserController.user_signup)
router.post('/login', UserController.user_login)

module.exports = router;
