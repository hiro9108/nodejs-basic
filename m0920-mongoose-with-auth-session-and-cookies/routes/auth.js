const express = require('express')
const { check, body } = require('express-validator')
const router = express.Router()
const authController = require('../controllers/auth')
const User = require('../models/User')

router.get('/login', authController.getLogin)
router.post(
    '/login', 
    [ 
        body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(), 
        body('password', 'Password has to be valid').isLength({ min: 5 }).isAlphanumeric().trim()
    ] ,
    authController.postLogin)
router.post('/logout', authController.postLogout)

router.get('/signup', authController.getSignup)
router.post(
    '/signup', 
    [
        check('email').isEmail().withMessage('Please enter a valid Email').custom((value, { req }) => {
            return User.findOne({ email: value }).then(user => {
                if(user){
                    return Promise.reject('Email already exists, please enter a different email address')
                }
            })
        }).normalizeEmail(),
        body('password', 'Please enter a password with only alphanumeric characters and at least 5 characters').isLength({ min: 5 }).isAlphanumeric().trim(),
        body('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Passwords have to match')
            }
            return true
        }).trim()
    ],
    authController.postSignup)

module.exports = router