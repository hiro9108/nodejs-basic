const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')

router.post('/register', async (req, res, next) => {
  try {
    let { email, password, confirmPassword, displayName } = req.body

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Not all fields have been entered' })
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 5 characters long.' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' })
    }

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' })
    }

    if (!displayName) displayName = email

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email: email,
      password: passwordHash,
      displayName: displayName,
    })

    const savedUser = await newUser.save()
    res.json({ msg: 'Created new user', savedUser })
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({ msg: 'Not all fields have been entered.'})
        }
        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(400).json({ msg: 'No account with this email has been registered.'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        res.json({
            msg: `${user.displayName} has logged in`,
            user: {
                id: user._id,
                email: user.email,
                displayName: user.displayName
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res, next) => {
  const users = await User.find()
  if (!users) {
    res.json({ msg: "No users" })
  }
  res.json({
    msg: "Users Data",
    users: users,
  })
})

module.exports = router